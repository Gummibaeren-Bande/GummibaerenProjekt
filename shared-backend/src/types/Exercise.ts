// TypeScript Type: Exercise

export interface Exercise {
  id: string;
  hasAlternative: boolean;
  alternativeIndex: number;
  question: string;
  type: "multiple-choice" | "numerical";
}

export class MultipleChoiceExercise implements Exercise {
  id: string;
  hasAlternative: boolean;
  alternativeIndex: number;
  question: string;
  type: "multiple-choice";
  options: string[] = [];
  correctOptionIndexes: number[] = [];

  constructor(
    id: string,
    question: string,
    options: string[],
    correctOptionIndexes: number[],
    hasAlternative: boolean,
    alternativeIndex: number
  ) {
    this.id = id;
    this.question = question;
    this.options = options;
    this.correctOptionIndexes = correctOptionIndexes;
    this.hasAlternative = hasAlternative;
    this.alternativeIndex = alternativeIndex;
    this.type = "multiple-choice";
  }
}

export class NumericalExercise implements Exercise {
  id: string;
  hasAlternative: boolean;
  alternativeIndex: number;
  question: string;
  type: "numerical";
  correctAnswer: number;

  constructor(
    id: string,
    question: string,
    correctAnswer: number,
    hasAlternative: boolean,
    alternativeIndex: number
  ) {
    this.id = id;
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.hasAlternative = hasAlternative;
    this.alternativeIndex = alternativeIndex;
    this.type = "numerical";
  }
}
