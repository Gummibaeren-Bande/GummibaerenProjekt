import Exercise from "./exercise/abstract/Exercise";
import { v4 as uuidv4 } from "uuid";
import Prerequisite from "./Prerequisite";
import TrackableTaskState from "../../enums/TrackableTaskState";

/**
 * This class represents a task that contains a list of exercises.
 */
class Task {
  private readonly id: string;
  private readonly name: string;
  private readonly exercises: Exercise[];
  private prerequisites: Prerequisite[] = [];

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

  public getPrerequisites(): Prerequisite[] {
    return this.prerequisites;
  }

  public addPrerequisite(
    prerequisite: Task,
    equals: boolean,
    state: TrackableTaskState
  ): void {
    this.prerequisites.push(new Prerequisite(prerequisite, equals, state));
  }
}

export default Task;
