import Exercise from "../interfaces/Exercise";
import Answer from "../types/Answer";
import { v4 as uuidv4 } from "uuid";

// This class is an implementation of the Exercise interface for numerical exercises.
class NumericalExercise implements Exercise {
  id: string;
  title: string;
  description: string;
  question: string;
  type: "numerical";
  correctAnswer: number;

  constructor(
    title: string,
    description: string,
    question: string,
    correctAnswer: number,
  ) {
    this.id = uuidv4();
    this.title = title;
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
