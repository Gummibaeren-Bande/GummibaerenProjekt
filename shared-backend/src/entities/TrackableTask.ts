import TrackableTaskState from "../enums/TrackableTaskState";
import Exercise from "./abstract/Exercise";
import Task from "./Task";
import EntityObserver from "../api/group-set/interfaces/EntityObserver";
import ObservableEntity from "./abstract/ObservableEntity";

/**
 * This class is used to add trackable properties to a task.
 */
class TrackableTask extends ObservableEntity {
  private readonly task: Task;
  private chosenExerciseIndex: number;
  private startedAt: Date | null;
  private finishedAfterSeconds: number | null;
  private tries: number;
  private state: TrackableTaskState;

  constructor(task: Task, subscriber: EntityObserver) {
    super(subscriber);
    this.task = task;
    this.chosenExerciseIndex = 0;
    this.startedAt = null;
    this.finishedAfterSeconds = null;
    this.tries = 0;
    this.state = TrackableTaskState.NotStarted;
  }

  public getState(): TrackableTaskState {
    return this.state;
  }

  private setState(newState: TrackableTaskState): void {
    this.state = newState;
  }

  public startTask(): void {
    if (this.startedAt) {
      //This Error is never reached
      throw new Error("The task has already been started");
    }
    this.startedAt = new Date();
    this.setState(TrackableTaskState.InProgress);
  }

  public getStartedAt(): Date | null {
    return this.startedAt;
  }

  public getTries(): number {
    return this.tries;
  }

  public getSkipped(): boolean {
    //This method is only called in the test file
    if (this.state === TrackableTaskState.Skipped) {
      return true;
    }
    return false;
  }

  public setSkipped(skipState: boolean): void {
    switch (this.state) {
      case TrackableTaskState.NotStarted:
        if (skipState) {
          this.setState(TrackableTaskState.Skipped);
        }
        break;
      case TrackableTaskState.InProgress:
        throw new Error("The task is in progress and can't be skipped");
      case TrackableTaskState.Completed:
        throw new Error("The task is already completed and can't be skipped");
      case TrackableTaskState.Skipped:
        if (!skipState) {
          this.setState(TrackableTaskState.NotStarted);
        }
        break;
    }
    this.notifySubscriber();
  }

  public complete(): void {
    this.stopTimer();
    this.setState(TrackableTaskState.Completed);
    this.notifySubscriber();
  }

  private stopTimer(): void {
    const started = this.getStartedAt();
    if (!started) {
      //This Error is never reached
      throw new Error(
        "The task has not been started yet and therefore can't be finished",
      );
    }
    this.finishedAfterSeconds =
      (new Date().getTime() - started.getTime()) / 1000;
  }

  public incrementTries(): void {
    this.tries++;
    this.notifySubscriber();
  }

  public setAlternativeExerciseById(id: string): void {
    const correspondingIndex = this.getTask()
      .getExercises()
      .findIndex((e) => e.id === id);

    switch (this.state) {
      case TrackableTaskState.InProgress:
        throw new Error("The task is in progress and can't be changed");
      case TrackableTaskState.Completed:
        throw new Error("The task is already completed and can't be changed");
      default:
        if (correspondingIndex === -1) {
          throw new Error("The given id of the exercise is not valid");
        }
        this.chosenExerciseIndex = correspondingIndex;
        break;
    }
    this.notifySubscriber();
  }

  public getChosenExercise(): Exercise {
    return this.task.getExercises()[this.chosenExerciseIndex];
  }

  public getChosenExerciseIndex(): number {
    return this.chosenExerciseIndex;
  }

  public getTask(): Task {
    return this.task;
  }

  public getFinishedAfterSeconds(): number | null {
    return this.finishedAfterSeconds;
  }
}

export default TrackableTask;
