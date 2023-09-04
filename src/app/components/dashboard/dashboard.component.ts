import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import {
  Duration,
  QuizzHistory,
  QuizzNames,
} from 'src/app/shared/models/quizz.models';
import { QuizzService } from '../../shared/services/quizz.service';
import { QuizzListComponent } from '../quizz-list/quizz-list.component';

const QUIZZ_APP = [QuizzListComponent];
const EXTERNAL = [CommonModule, RouterModule];
const MATERIAL = [MatButtonModule, MatInputModule];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [],
  standalone: true,
  imports: [EXTERNAL, MATERIAL, QUIZZ_APP],
})
export class DashboardComponent implements OnInit {
  quizzes: QuizzHistory[] = [];
  quizzNames = QuizzNames;

  constructor(private quizzService: QuizzService, private router: Router) {}

  ngOnInit(): void {
    this.quizzService.loadQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes.map((q) => {
        const minutes = this._getDuration(
          q.quizzStartedTime,
          q.quizzEndTime,
          'min'
        );
        const seconds = this._getDuration(
          q.quizzStartedTime,
          q.quizzEndTime,
          'sec'
        );

        let totalTime: Duration = {
          min: minutes,
          sec: seconds - 1,
        };

        return {
          ...q,
          totalTime,
          averageTime: (minutes * 60 + seconds) / 10,
        };
      });
    });
  }

  onDeleteQuizz(id: number): void {
    this.quizzService.deleteQuizz(id).subscribe();
  }

  startQuizz(name: QuizzNames): void {
    this.quizzService.startQuizz(name).subscribe((quizz) => {
      this.router.navigate(['/', 'quizz', 'edit', quizz.id]);
    });
  }

  private _getDuration(start: Date, end: Date, format: 'min' | 'sec'): number {
    return format === 'min'
      ? new Date(end).getMinutes() - new Date(start).getMinutes()
      : new Date(end).getSeconds() - new Date(start).getSeconds();
  }
}
