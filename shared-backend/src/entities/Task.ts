import Exercise from "../interfaces/Exercise";

class Task {
  private readonly exercises: Exercise[];

  constructor(exercises: Exercise[]) {
    this.exercises = exercises;
  }

  public getExcercises(): Exercise[] {
    return this.exercises;
  }
}

export default Task;
