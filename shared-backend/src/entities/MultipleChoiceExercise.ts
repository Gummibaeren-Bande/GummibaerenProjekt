import Exercise from "../interfaces/Exercise";
import Answer from "../types/Answer";

// This class is an implementation of the Exercise interface for multiple choice exercises.
class MultipleChoiceExercise implements Exercise {
  id: string;
  description: string;
  question: string;
  type: "multiple-choice";
  options: string[] = [];
  correctOptionIndexes: number[] = [];

  constructor(
    id: string,
    description: string,
    question: string,
    options: string[],
    correctOptionIndexes: number[],
  ) {
    this.id = id;
    this.question = question;
    this.options = options;
    this.correctOptionIndexes = correctOptionIndexes;
    this.description = description;
    this.type = "multiple-choice";
  }

  public answer(answer: Answer): boolean {
    throw new Error("Not implemented yet!");
  }
}

export default MultipleChoiceExercise;
