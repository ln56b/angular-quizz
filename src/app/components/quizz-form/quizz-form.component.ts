import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription, interval, startWith } from 'rxjs';
import { Answer } from 'src/app/shared/models/question.model';
import { QuizzService } from 'src/app/shared/services/quizz.service';
import { Quizz } from '../../shared/models/quizz.models';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const EXTERNAL = [CommonModule, RouterModule];
const MATERIAL = [
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatProgressBarModule,
];

@Component({
  selector: 'app-quizz-form',
  templateUrl: './quizz-form.component.html',
  styleUrls: [],
  standalone: true,
  imports: [EXTERNAL, MATERIAL],
})
export class QuizzFormComponent implements OnInit {
  quizz: Quizz | null = null;
  currentQuestionIndex = 0;
  missingAnswer = true;
  totalTimer = { min: 0, sec: 0 };
  questionCountdown = 10;
  displayedAnswers: Answer[] = [];
  displayPublicVotes = false;
  publicVotes = [];
  isReplay = false;

  private timerSubscription$ = new Subscription();
  private countdownSubscription$ = new Subscription();

  constructor(
    private quizzService: QuizzService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.quizzService.getQuizz(id).subscribe((quizz) => {
      if (quizz.isCompleted) {
        this.isReplay = true;
        quizz.selectedQuestionIndex = 0;
        quizz.userAnswers = [];
        quizz.canUseFiftyFiftyJoker = false;
        quizz.canUsePublicVote = false;
        quizz.score = 0;
      }

      this.currentQuestionIndex = quizz.selectedQuestionIndex;
      this.quizz = quizz;
      this.displayedAnswers =
        this.quizz.categories[this.currentQuestionIndex]?.answers;
    });

    this._startTimer();
    this._startCountdown();
  }

  provideAnswer(answer: Answer): void {
    this.missingAnswer = false;
    this.quizz.userAnswers.push(answer);
    this._updateScore(answer);

    this._saveInProgressQuizz();

    if (this.currentQuestionIndex + 1 === this.quizz.categories.length) {
      this._endQuizz();
    }

    if (this.displayPublicVotes) {
      this.displayPublicVotes = false;
    }
  }

  goToNextQuestion(): void {
    this.countdownSubscription$.unsubscribe();
    this.questionCountdown = 10;
    this.currentQuestionIndex += 1;
    this.missingAnswer = true;
    this.displayedAnswers =
      this.quizz.categories[this.currentQuestionIndex]?.answers;
    this._startCountdown();
  }

  useJoker(joker: 'fifty-fifty' | 'public-vote'): void {
    if (joker === 'fifty-fifty') {
      this._updateDisplayedAnswers();
      this.quizz.canUseFiftyFiftyJoker = false;
    } else if ('public-vote') {
      this._getPublicVotes();
      this.quizz.canUsePublicVote = false;
    }
    this.quizzService.updateQuizz(this.quizz).subscribe();
  }

  endTimer(): void {
    this.timerSubscription$.unsubscribe();
  }

  private _getPublicVotes(): void {
    this.displayPublicVotes = true;

    let likelyCorrectAnswers = [];
    this.quizz.categories[this.currentQuestionIndex].answers.map((a) => {
      if (!a.isCorrect) {
        if (
          likelyCorrectAnswers.includes(true) &&
          likelyCorrectAnswers.length < 2
        ) {
          likelyCorrectAnswers.push(a.isCorrect);
          a.vote = 35;
        } else if (
          !likelyCorrectAnswers.includes(true) &&
          likelyCorrectAnswers.length < 1
        ) {
          likelyCorrectAnswers.push(a.isCorrect);
          a.vote = 35;
        } else {
          a.vote = 15;
        }
      } else {
        a.vote = 35;
      }
    });
  }

  private _updateDisplayedAnswers(): void {
    const answers = this.quizz.categories[this.currentQuestionIndex].answers;
    const isCorrect = answers.find((a) => a.isCorrect);
    const randomWrong = answers.filter((a) => !a.isCorrect)[
      Math.floor(Math.random() * answers.length)
    ];

    this.displayedAnswers = [isCorrect, randomWrong];
  }

  private _saveInProgressQuizz(): void {
    this.quizz.selectedQuestionIndex = this.currentQuestionIndex + 1;
    this.quizzService.updateQuizz(this.quizz).subscribe();
  }

  private _endQuizz(): void {
    this.quizz.isCompleted = true;
    this.quizz.totalTime.min = this.totalTimer.min;
    this.quizz.totalTime.sec = this.totalTimer.sec;
    localStorage.setItem('totalMin', '0');
    localStorage.setItem('totalSec', '0');
    this.endTimer();
    this.countdownSubscription$.unsubscribe();
    this.quizzService.updateQuizz(this.quizz).subscribe();
  }

  private _updateScore(answer: Answer): void {
    if (answer.isCorrect) {
      this.quizz.score += 1;
    }
  }

  private _startTimer(): void {
    if (localStorage.getItem('totalTimer') !== null) {
      this.totalTimer = {
        min: Number(localStorage.getItem('totalTimer.min')),
        sec: Number(localStorage.getItem('totalTimer.sec')),
      };
    }
    this.timerSubscription$ = interval(1000).subscribe(() => {
      if (this.totalTimer.sec < 60) {
        this.totalTimer.sec += 1;
        localStorage.setItem('totalTimer.sec', this.totalTimer.sec.toString());
      } else {
        this.totalTimer.sec = 0;
        this.totalTimer.min += 1;
        localStorage.setItem('totalTimer.sec', '0');
        localStorage.setItem('totalTimer.min', this.totalTimer.min.toString());
      }
    });
  }

  private _startCountdown(): void {
    this.countdownSubscription$ = interval(1000).subscribe(() => {
      this.questionCountdown -= 1;

      if (this.questionCountdown === 0) {
        this.goToNextQuestion();
      }
    });
  }
}
