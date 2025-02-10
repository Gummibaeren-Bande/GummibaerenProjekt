// Exercise abstract class

import Answer from "../types/Answer";

export default abstract class Exercise {
  id!: string;
  title!: string;
  description!: string;
  question!: string;
  abstract type: "multiple-choice" | "numerical";

  /**
   * try to answer the exercise with the given answer
   *
   * @param answer the answer provided by the group
   * @returns true if the answer is correct, false otherwise
   */
  public abstract answer(answer: Answer): boolean;

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getQuestion(): string {
    return this.question;
  }

  public getType(): "multiple-choice" | "numerical" {
    return this.type;
  }
}
