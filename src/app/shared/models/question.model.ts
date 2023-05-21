export interface Answer {
  id: number;
  questionId: number;
  label: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
}
