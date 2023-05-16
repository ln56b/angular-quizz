import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Quizz, QuizzNames } from 'src/app/shared/models/quizz.models';

const EXTERNAL = [CommonModule];
const MATERIAL = [MatTableModule, MatIconModule];

@Component({
  selector: 'app-quizz-list',
  templateUrl: './quizz-list.component.html',
  styleUrls: ['./quizz-list.component.scss'],
  standalone: true,
  imports: [EXTERNAL, MATERIAL],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizzListComponent implements OnInit {
  @Input() quizzes: Quizz[] = [];

  quizzNames = QuizzNames;

  tableHeaders = [
    'name',
    'score',
    'total-time',
    'average-time',
    '50-50',
    'public-vote',
  ];

  ngOnInit(): void {}
}
