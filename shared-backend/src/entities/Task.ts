import Exercise from "../interfaces/Exercise";
import { v4 as uuidv4 } from "uuid";

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

  public getExcercises(): Exercise[] {
    return this.exercises;
  }
}

export default Task;
