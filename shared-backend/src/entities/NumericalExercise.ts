import Exercise from "../abstract-classes/Exercise";
import Answer from "../types/Answer";
import { v4 as uuidv4 } from "uuid";

/**
 * This class is an implementation of the Exercise abstract class for numerical exercises.
 */
class NumericalExercise extends Exercise {
  readonly type: "numerical";
  private readonly correctAnswer: number;

  constructor(
    title: string,
    description: string,
    question: string,
    correctAnswer: number,
  ) {
    super();
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.question = question;
    this.type = "numerical";
    this.correctAnswer = correctAnswer;
  }

  /**
   * This method checks if the answer is correct.
   * @param answer takes in an answer and checks if it is correct
   * @returns true if the answer is correct, false otherwise
   */
  public checkAnswer(answer: Answer): boolean {
    if (typeof answer !== "number") {
      throw new Error("The answer must be a number");
    }
    return answer === this.correctAnswer;
  }
}

export default NumericalExercise;
