import TrackableTaskState from "../enums/TrackableTaskState";
import Exercise from "../abstract-classes/Exercise";
import Task from "./Task";

class TrackableTask {
  private readonly task: Task;
  private chosenExercise: Exercise;
  private startedAt: Date | null;
  private finishedAfterSeconds: number | null;
  private tries: number;
  private skipped: boolean;

  constructor(task: Task) {
    this.task = task;
    this.chosenExercise = task.getExcercises()[0];
    this.startedAt = null;
    this.finishedAfterSeconds = null;
    this.tries = 0;
    this.skipped = false;
  }

  get state(): TrackableTaskState {
    if (this.skipped) {
      return TrackableTaskState.Skipped;
    } else if (this.finishedAfterSeconds) {
      return TrackableTaskState.Completed;
    } else if (this.startedAt) {
      return TrackableTaskState.InProgress;
    }
    return TrackableTaskState.NotStarted;
  }

  public startTask(): void {
    this.startedAt = new Date();
  }

  public getStartedAt(): Date | null {
    return this.startedAt;
  }

  public getTries(): number {
    return this.tries;
  }

  public getSkipped(): boolean {
    return this.skipped;
  }

  public setSkipped(skipState: boolean): void {
    this.skipped = skipState;
    if (this.skipped) {
      this.stopTimer();
    } else {
      this.restartTimer();
    }
  }

  public complete(): void {
    this.stopTimer();
  }

  private stopTimer() {
    const started = this.getStartedAt();
    if (!started) {
      throw new Error(
        "The task was not started yet and can't therefore not be finished"
      );
    }
    this.finishedAfterSeconds =
      (new Date().getTime() - started.getTime()) / 1000;
  }

  private restartTimer() {
    this.finishedAfterSeconds = null;
    this.startedAt = new Date();
  }

  public incrementTries(): void {
    this.tries++;
  }

  public setAlternativeExercise(index: number): void {
    this.chosenExercise = this.task.getExcercises()[index];
  }

  public getChosenExercise(): Exercise {
    return this.chosenExercise;
  }
}

export default TrackableTask;
