export interface Answer {
  id: number;
  questionId: number;
  label: string;
  isCorrect: boolean;
  vote?: number;
}

export interface Question {
  id: number;
  text: string;
}
