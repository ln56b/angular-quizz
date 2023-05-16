import { Question } from './question.model';

export interface Category {
  hero: string;
  question: Question;
}

export interface Quizz {
  id: number;
  name: string;
  categories: Category[];
  selectedQuestionIndex: number;
  canUseFiftyFiftyJoker: boolean;
  canUsePublicVote: boolean;
  score: number;
  quizzStartedTime: string;
  quizzEndTime: string;
}

export enum QuizzNames {
  HEADS = 'heads',
  TAILS = 'tails',
}
