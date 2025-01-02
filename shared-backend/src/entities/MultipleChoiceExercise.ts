import Exercise from "../abstract-classes/Exercise";
import Answer from "../types/Answer";
import { v4 as uuidv4 } from "uuid";

/**
 * This class is an implementation of the Exercise abstract class for multiple choice exercises.
 */
class MultipleChoiceExercise extends Exercise {
  readonly type: "multiple-choice";
  private readonly options: string[];
  private readonly correctOptionIndexes: number[];

  constructor(
    title: string,
    description: string,
    question: string,
    options: string[],
    correctOptionIndexes: number[]
  ) {
    super();
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.question = question;
    this.type = "multiple-choice";
    this.options = options;
    this.correctOptionIndexes = correctOptionIndexes;
  }

  public checkAnswer(answer: Answer): boolean {
    if (!Array.isArray(answer)) {
      throw new Error("Answer must be an array of indexes");
    }
    return (
      this.correctOptionIndexes.every((index) => answer.includes(index)) &&
      answer.length === this.correctOptionIndexes.length
    );
  }

  public getOptions(): string[] {
    return this.options;
  }

  public getCorrectOptionIndexes(): number[] {
    return this.correctOptionIndexes;
  }
}

export default MultipleChoiceExercise;
