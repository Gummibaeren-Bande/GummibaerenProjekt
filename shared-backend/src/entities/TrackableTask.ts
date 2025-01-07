import TrackableTaskState from "../enums/TrackableTaskState";
import Exercise from "../abstract-classes/Exercise";
import Task from "./Task";

/**
 * This class is used to add trackable properties to a task.
 */
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

  public async startTask(): Promise<void> {
    if (this.startedAt) {
      throw new Error("The task is already started");
    }
    this.startedAt = new Date();
    await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure state change
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
    switch (this.state) {
      case TrackableTaskState.NotStarted:
        this.skipped = skipState;
        break;
      case TrackableTaskState.InProgress:
        throw new Error("The task is in progress and can't be skipped");
      case TrackableTaskState.Completed:
        throw new Error("The task is already completed and can't be skipped");
      case TrackableTaskState.Skipped:
        this.skipped = skipState;
        break;
    }
  }

  public async complete(): Promise<void> {
    await this.stopTimer();
    await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure state change
  }

  private async stopTimer(): Promise<void> {
    const started = this.getStartedAt();
    if (!started) {
      throw new Error(
        "The task has not been started yet and therefore can't be finished",
      );
    }
    this.finishedAfterSeconds =
      (new Date().getTime() - started.getTime()) / 1000;
    await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure state change
  }

  public incrementTries(): void {
    this.tries++;
  }

  public setAlternativeExercise(index: number): void {
    switch (this.state) {
      case TrackableTaskState.NotStarted:
        this.chosenExercise = this.task.getExcercises()[index];
        break;
      case TrackableTaskState.InProgress:
        throw new Error("The task is in progress and can't be changed");
      case TrackableTaskState.Completed:
        throw new Error("The task is already completed and can't be changed");
      case TrackableTaskState.Skipped:
        this.chosenExercise = this.task.getExcercises()[index];
        break;
    }
  }

  public getChosenExercise(): Exercise {
    return this.chosenExercise;
  }

  public getTask(): Task {
    return this.task;
  }

  public getFinishedAfterSeconds(): number | null {
    return this.finishedAfterSeconds;
  }
}

export default TrackableTask;
