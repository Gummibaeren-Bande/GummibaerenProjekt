import Exercise from "../interfaces/Exercise";
import Answer from "../types/Answer";

// This class is an implementation of the Exercise interface for numerical exercises.
class NumericalExercise implements Exercise {
  id: string;
  description: string;
  question: string;
  type: "numerical";
  correctAnswer: number;

  constructor(
    id: string,
    description: string,
    question: string,
    correctAnswer: number,
  ) {
    this.id = id;
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.description = description;
    this.type = "numerical";
  }

  public answer(answer: Answer): boolean {
    throw new Error("Not Implemented yet!");
  }
}

export default NumericalExercise;
