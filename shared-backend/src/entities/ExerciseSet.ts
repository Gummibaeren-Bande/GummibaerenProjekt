import {
  Exercise,
  MultipleChoiceExercise,
  NumericalExercise,
} from "../types/Exercise";
class ExerciseSet {
  private readonly exercises: Exercise[];

  constructor(importString: string) {
    this.exercises = [];
  }

  public getExercises(): Exercise[] {
    return this.exercises;
  }
}
