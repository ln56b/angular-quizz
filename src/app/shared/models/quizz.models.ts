import { Question, Answer } from './question.model';

export interface Category {
  hero: string;
  question: Question;
  answers: Answer[];
}

export interface Quizz {
  id: number;
  name: string;
  categories: Category[];
  selectedQuestionIndex: number;
  canUseFiftyFiftyJoker: boolean;
  canUsePublicVote: boolean;
  score: number;
  userAnswers: Answer[];
  isCompleted: boolean;
  totalTime: Duration;
}

export interface QuizzHistory extends Quizz {
  averageTime: number;
}

export interface Duration {
  min: number;
  sec: number;
}

export enum QuizzNames {
  HEADS = 'heads',
  TAILS = 'tails',
}
