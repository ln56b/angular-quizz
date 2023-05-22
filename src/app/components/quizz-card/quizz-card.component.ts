import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-quizz-card',
  templateUrl: './quizz-card.component.html',
  styleUrls: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizzCardComponent {}
