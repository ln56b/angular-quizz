import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Answer } from 'src/app/shared/models/question.model';
import { QuizzService } from 'src/app/shared/services/quizz.service';
import { Quizz } from '../../shared/models/quizz.models';

const EXTERNAL = [CommonModule, RouterModule];
const MATERIAL = [MatIconModule];

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
  isCompleted = false;
  missingAnswer = true;
  timer = 0;
  displayedAnswers: Answer[] = [];

  private subscription = new Subscription();

  constructor(
    private quizzService: QuizzService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.quizzService.getQuizz(id).subscribe((quizz) => {
      this.quizz = quizz;
      this.displayedAnswers =
        this.quizz.categories[this.currentQuestionIndex].answers;
    });

    this.subscription = interval(1000).subscribe(() => this.getTimer);
  }

  provideAnswer(answer: Answer): void {
    this.missingAnswer = false;
    this.quizz.userAnswers.push(answer);
    this._updateScore(answer);

    if (this.currentQuestionIndex + 1 === this.quizz.categories.length) {
      this.quizz.quizzEndTime = new Date();
      this._endQuizz();
    }
  }

  goToNextQuestion(): void {
    this.currentQuestionIndex += 1;
    this.missingAnswer = true;
    this.displayedAnswers =
      this.quizz.categories[this.currentQuestionIndex].answers;
  }

  useJoker(joker: 'fifty-fifty' | 'public-vote'): void {
    this._updateDisplayedAnswers();
    if (joker === 'fifty-fifty') {
      this.quizz.canUseFiftyFiftyJoker = false;
    } else if ('public-vote') {
      this.quizz.canUsePublicVote = false;
    }
  }

  private _updateDisplayedAnswers(): void {
    const isCorrect = this.quizz.categories[
      this.currentQuestionIndex
    ].answers.find((a) => a.isCorrect);
    const answers = this.quizz.categories[this.currentQuestionIndex].answers;
    const randomWrong = answers[Math.floor(Math.random() * answers.length)];

    this.displayedAnswers = [isCorrect, randomWrong];
  }

  private _endQuizz(): void {
    this.isCompleted = true;
    this.subscription.unsubscribe();
    this.quizzService.updateQuizz(this.quizz).subscribe();
  }

  private _updateScore(answer: Answer): void {
    if (answer.isCorrect) {
      this.quizz.score += 1;
    }
  }

  get getTimer(): number {
    return (
      new Date().getSeconds() -
      new Date(this.quizz.quizzStartedTime).getSeconds()
    );
  }
}
