import { Question } from './question.model';

export interface Category {
  hero: string;
  question: Question;
}

export interface Quizz {
  id: number;
  categories: Category[];
  selectedQuestionIndex: number;
  canUseFiftyFiftyJoker: boolean;
  canUsePublicVote: boolean;
  score: number;
  quizzStartedTime: string;
  quizzEndTime: string;
}
