export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  answers?: Answer[];
  index?: number;
  userAnswerId?: string;
}
