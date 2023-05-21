import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { QuizzHistory, QuizzNames } from 'src/app/shared/models/quizz.models';
import { RouterModule } from '@angular/router';

const EXTERNAL = [CommonModule, RouterModule];
const MATERIAL = [
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
];

@Component({
  selector: 'app-quizz-list',
  templateUrl: './quizz-list.component.html',
  styleUrls: ['./quizz-list.component.scss'],
  standalone: true,
  imports: [EXTERNAL, MATERIAL],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizzListComponent {
  @Input() quizzes: QuizzHistory[] = [];
  @Output() deleteQuizzEvent = new EventEmitter<number>();

  quizzNames = QuizzNames;

  tableHeaders = [
    'name',
    'score',
    'total-time',
    'average-time',
    '50-50',
    'public-vote',
    'replay',
  ];

  deleteQuizz(id: number): void {
    this.deleteQuizzEvent.emit(id);
  }
}
