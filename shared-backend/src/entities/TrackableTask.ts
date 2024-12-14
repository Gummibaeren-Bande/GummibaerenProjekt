import Exercise from "../interfaces/Exercise";
import Task from "./Task";

class TrackableTask {
  private readonly task: Task;
  private chosenExercise: Exercise;
  private timer: number;
  private tries: number;
  private skipped: boolean;
  private isCompleted: boolean;

  constructor(task: Task) {
    this.task = task;
    this.chosenExercise = task.getExcercises()[0]
    this.timer = 0; // in seconds
    this.tries = 0;
    this.skipped = false;
    this.isCompleted = false;
  }

  public getTimer(): number {
    return this.timer;
  }

  public getTries(): number {
    return this.tries;
  }

  public getSkipped(): boolean {
    return this.skipped;
  }

  public getIsCompleted(): boolean {
    return this.isCompleted;
  }

  public setSkipped(skipState: boolean): void {
    this.skipped = skipState;
  }

  public complete(): void {
    this.isCompleted = true;
  }

  public incrementTries(): void {
    this.tries++;
  }

  public setTimer(time: number): void {
    this.timer = time;
  }

  public setAlternativeExercise(index: number): void {
    this.chosenExercise = this.task.getExcercises()[index];
  }

  public getChosenExercise(): Exercise {
    return this.chosenExercise;
  }
}

export default TrackableTask;
