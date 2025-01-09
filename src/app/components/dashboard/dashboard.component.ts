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
      this.quizzes = quizzes?.map((q) => {
        return {
          ...q,
          averageTime: (q.totalTime.min * 60 + q.totalTime.sec) / 10,
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
}
