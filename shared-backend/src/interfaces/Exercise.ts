// Exercise interface

import Answer from "../types/Answer";

export default interface Exercise {
  id: string;
  title: string;
  description: string;
  question: string;
  type: "multiple-choice" | "numerical";

  /**
   * try to answer the excercise with the given answer
   *
   * @param answer the answer provided by the group
   * @returns true if the answer is correct, false otherwise
   */
  answer: (answer: Answer) => boolean;
}
