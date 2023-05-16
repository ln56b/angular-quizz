import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

const EXTERNAL = [CommonModule, RouterModule, ReactiveFormsModule];
const MATERIAL = [
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatStepperModule,
];

@Component({
  selector: 'app-quizz-form',
  templateUrl: './quizz-form.component.html',
  styleUrls: ['./quizz-form.component.scss'],
  standalone: true,
  imports: [EXTERNAL, MATERIAL],
})
export class QuizzFormComponent {
  quizzQuestions = [
    {
      hero: 'Batman',
      question: {
        id: 1,
        text: 'Dans quel quartier de Gotham City se trouve le Manoir Wayne, la résidence de Batman?',
      },
      answers: [
        {
          id: '1',
          label: 'Quartier de Chinatown',
          isCorrect: false,
        },
        {
          id: '2',
          label: "Quartier de l'Est",
          isCorrect: false,
        },
        {
          id: '3',
          label: 'Quartier de Park Row',
          isCorrect: true,
        },
        {
          id: '4',
          label: 'Quartier de Southside',
          isCorrect: false,
        },
      ],
    },
    {
      hero: 'Hulk',
      question: {
        id: 2,
        text: 'Dans quelle ville américaine le Dr Bruce Banner est-il devenu Hulk pour la première fois?',
      },
      answers: [
        {
          id: '5',
          label: 'New York',
          isCorrect: false,
        },
        {
          id: '6',
          label: 'Las Vegas',
          isCorrect: false,
        },
        {
          id: '7',
          label: 'Los Angeles',
          isCorrect: false,
        },
        {
          id: '8',
          label: 'Dessert Base Gamma au Nouveau-Mexique',
          isCorrect: true,
        },
      ],
    },
    {
      hero: 'Catwoman',
      question: {
        id: 3,
        text: 'Quel est le vrai nom de Catwoman?',
      },
      answers: [
        {
          id: '9',
          label: 'Selina Kyle',
          isCorrect: true,
        },
        {
          id: '10',
          label: 'Pamela Isley',
          isCorrect: false,
        },
        {
          id: '11',
          label: 'Harleen Quinzel',
          isCorrect: false,
        },
        {
          id: '12',
          label: 'Holly Robinson',
          isCorrect: false,
        },
      ],
    },
    {
      hero: 'Iron Man',
      question: {
        id: 3,
        text: 'Dans quelle ville se trouve le siège de Stark Industries, la société de Tony Stark?',
      },
      answers: [
        {
          id: '13',
          label: 'New York',
          isCorrect: false,
        },
        {
          id: '14',
          label: 'Los Angeles',
          isCorrect: false,
        },
        {
          id: '15',
          label: 'Chicago',
          isCorrect: false,
        },
        {
          id: '16',
          label: 'Malibu',
          isCorrect: true,
        },
      ],
    },
    {
      hero: 'Ant-Man',
      question: {
        id: 4,
        text: "Qui est le créateur du costume d'Ant-Man?",
      },
      answers: [
        {
          id: '17',
          label: 'Tony Stark',
          isCorrect: false,
        },
        {
          id: '18',
          label: 'Hank Pym',
          isCorrect: true,
        },
        {
          id: '19',
          label: 'Reed Richards',
          isCorrect: false,
        },
        {
          id: '20',
          label: 'Bruce Banner',
          isCorrect: false,
        },
      ],
    },
    {
      hero: 'Captain America',
      question: {
        id: 5,
        text: 'Quel est le vrai nom de Captain America?',
      },
      answers: [
        {
          id: '21',
          label: 'Steve Rogers',
          isCorrect: true,
        },
        {
          id: '22',
          label: 'Bucky Barnes',
          isCorrect: false,
        },
        {
          id: '23',
          label: 'John Walker',
          isCorrect: false,
        },
        {
          id: '24',
          label: 'Isaiah Bradley',
          isCorrect: false,
        },
      ],
    },
    {
      hero: 'Wolverine',
      question: {
        id: 6,
        text: 'Quel métal compose le squelette de Wolverine?',
      },
      answers: [
        {
          id: '25',
          label: 'Fer',
          isCorrect: false,
        },
        {
          id: '26',
          label: 'Plomb',
          isCorrect: false,
        },
        {
          id: '27',
          label: 'Titane',
          isCorrect: false,
        },
        {
          id: '28',
          label: 'Adamantium',
          isCorrect: true,
        },
      ],
    },
    {
      hero: 'Spider Man',
      question: {
        id: 7,
        text: 'Quel est le véritable nom de Spider-Man?',
      },
      answers: [
        {
          id: '29',
          label: 'Peter Parker',
          isCorrect: true,
        },
        {
          id: '30',
          label: 'Eddie Brock',
          isCorrect: false,
        },
        {
          id: '31',
          label: 'Miles Morales',
          isCorrect: false,
        },
        {
          id: '32',
          label: 'Ben Reilly',
          isCorrect: false,
        },
      ],
    },
    {
      hero: 'Sorcière Rouge',
      question: {
        id: 7,
        text: 'Quel est le véritable nom de la Sorcière Rouge?',
      },
      answers: [
        {
          id: '33',
          label: 'Wanda Wilson',
          isCorrect: false,
        },
        {
          id: '34',
          label: 'Wanda Maximoff',
          isCorrect: true,
        },
        {
          id: '35',
          label: 'Wanda Walters',
          isCorrect: false,
        },
        {
          id: '36',
          label: 'Wanda Summers',
          isCorrect: false,
        },
      ],
    },
    {
      hero: 'Black Panther',
      question: {
        id: 8,
        text: 'Dans quelle ville fictive se trouve le Wakanda, le pays de Black Panther?',
      },
      answers: [
        {
          id: '37',
          label: 'Zamunda',
          isCorrect: false,
        },
        {
          id: '38',
          label: 'Genosha',
          isCorrect: false,
        },
        {
          id: '39',
          label: 'Sokovia',
          isCorrect: false,
        },
        {
          id: '40',
          label: 'Wakanda',
          isCorrect: true,
        },
      ],
    },
  ];
  questionsFormGroup = this._formBuilder.group({
    question1: ['', Validators.required],
    question2: ['', Validators.required],
    question3: ['', Validators.required],
    question4: ['', Validators.required],
    question5: ['', Validators.required],
    question6: ['', Validators.required],
    question7: ['', Validators.required],
    question8: ['', Validators.required],
    question9: ['', Validators.required],
    question10: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {}
}
