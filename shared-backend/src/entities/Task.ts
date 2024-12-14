import Exercise from "../interfaces/Exercise";

class Task {
  private readonly exercises: Exercise[];
  private chosenExercise: Exercise;

  constructor(exercises: Exercise[]) {
    this.exercises = exercises;
    this.chosenExercise = this.exercises[0];
  }

  public setAlternativeExercise(index: number): void {
    this.chosenExercise = this.exercises[index];
  }

  public getChosenExercise(): Exercise {
    return this.chosenExercise;
  }
}

export default Task;
