import Exercise from "../abstract-classes/Exercise";
import { v4 as uuidv4 } from "uuid";

/**
 * This class represents a task that contains a list of exercises.
 */
class Task {
  private readonly id: string;
  private readonly name: string;
  private readonly exercises: Exercise[];

  constructor(name: string, exercises: Exercise[]) {
    this.id = uuidv4();
    this.name = name;
    this.exercises = exercises;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getExercises(): Exercise[] {
    return this.exercises;
  }
}

export default Task;
