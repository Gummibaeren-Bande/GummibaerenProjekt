import Exercise from "../interfaces/Exercise";

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
    correctAnswer: number
  ) {
    this.id = id;
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.description = description;
    this.type = "numerical";
  }
}

export default NumericalExercise;
