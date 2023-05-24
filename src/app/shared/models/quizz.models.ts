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
  quizzStartedTime: Date;
  quizzEndTime: Date;
}

export interface QuizzHistory extends Quizz {
  totalTime: Duration;
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
