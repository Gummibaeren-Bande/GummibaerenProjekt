import Exercise from "../interfaces/Exercise";
import Task from "./Task";

class TrackableTask extends Task {
  private timer: number;
  private tries: number;
  private skipped: boolean;
  private isCompleted: boolean;

  constructor(exercises: Exercise[]) {
    super(exercises);
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
}

export default TrackableTask;
