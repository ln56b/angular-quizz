import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Quizz, QuizzNames } from 'src/app/shared/models/quizz.models';
import { QuizzService } from '../../shared/services/quizz.service';
import { QuizzListComponent } from '../quizz-list/quizz-list.component';

const QUIZZ_APP = [QuizzListComponent];
const EXTERNAL = [CommonModule];
const MATERIAL = [MatButtonModule, MatInputModule];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [EXTERNAL, MATERIAL, QUIZZ_APP],
})
export class DashboardComponent implements OnInit {
  quizzes: Quizz[] = [];
  quizzNames = QuizzNames;

  constructor(private quizzService: QuizzService, private router: Router) {}

  ngOnInit(): void {
    this.quizzService.loadQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }

  startQuizz(name: QuizzNames): void {
    this.quizzService.startQuizz(name).subscribe((quizz) => {
      this.router.navigate(['/', 'quizz', 'edit', quizz.id]);
    });
  }
}
