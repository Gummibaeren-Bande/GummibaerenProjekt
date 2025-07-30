import EntityObserver from "../api/group-set/interfaces/EntityObserver";
import TrackableTaskState from "../enums/TrackableTaskState";
import ObservableEntity from "./abstract/ObservableEntity";
import TaskSet from "./TaskSet";
import TrackableTask from "./TrackableTask";
/**
 * This class is used to track the progress of a group on their tasks.
 */
class GroupProgress extends ObservableEntity {
  private readonly progress: TrackableTask[];
  private startedAt: Date;
  private finishedAfterSeconds: number | null;
  private indexOfCurrentTask = 0;

  constructor(taskSet: TaskSet, subscriber: EntityObserver) {
    super(subscriber);
    this.progress = [];
    for (const task of taskSet.getTasks()) {
      this.progress.push(new TrackableTask(task, subscriber));
    }
    this.indexOfCurrentTask = 0;
    this.startedAt = new Date();
    this.finishedAfterSeconds = null;
    this.progress[this.indexOfCurrentTask].startTask();
  }

  public getStartedAt(): Date {
    return this.startedAt;
  }

  public getIndexOfCurrentTask(): number {
    return this.indexOfCurrentTask;
  }
  public getCurrentTask(): TrackableTask {
    return this.progress[this.indexOfCurrentTask];
  }

  public getNumberOfFinishedTasks(): number {
    let counter = 0;
    for (const task of this.progress) {
      if (task.getState() == TrackableTaskState.Completed) {
        counter++;
      }
    }
    return counter;
  }

  public getTaskById(id: string): TrackableTask | undefined {
    for (const task of this.progress) {
      if (task.getTask().getId() === id) {
        return task;
      }
    }
    return undefined;
  }

  public getFinishedAfterSeconds(): number | null {
    return this.finishedAfterSeconds;
  }

  public getFinishedWork(): boolean {
    if (this.finishedAfterSeconds === null) {
      return false;
    }
    return true;
  }

  /**
   * This method is used to finish the group progress.
   */
  public finishWork() {
    if (this.finishedAfterSeconds) {
      throw new Error("Die Bearbeitung der Gruppe wurde bereits beendet");
    }
    this.stopTimer();
    this.notifySubscriber();
  }

  /**
   * stops the timer of the group
   */
  private stopTimer() {
    const started = this.getStartedAt();
    this.finishedAfterSeconds =
      (new Date().getTime() - started.getTime()) / 1000;
  }

  /**
   * This method checks if there are more tasks left to work on.
   * @returns true if there are more tasks left to work on, false otherwise
   */
  public hasNextTask(): boolean {
    let counter = 0;
    if (this.indexOfCurrentTask === this.progress.length - 1) {
      return false;
    }
    for (let i = this.indexOfCurrentTask + 1; i < this.progress.length; i++) {
      if (this.progress[i].getState() === TrackableTaskState.Skipped) {
        counter++;
      }
    }
    if (counter === this.progress.length - this.indexOfCurrentTask - 1) {
      return false;
    }
    return true;
  }

  /**
   * This method is used to go to the next task.
   * @returns the next task to work on
   */
  public goToNextTask(): TrackableTask {
    if (!this.hasNextTask()) {
      throw new Error("No more tasks left to work on");
    }
    if (
      this.progress[this.indexOfCurrentTask].getState() !==
        TrackableTaskState.Completed &&
      this.progress[this.indexOfCurrentTask].getState() !==
        TrackableTaskState.Skipped
    ) {
      throw new Error("The current task has not been completed yet");
    }
    this.indexOfCurrentTask++;
    if (
      this.progress[this.indexOfCurrentTask].getState() ===
      TrackableTaskState.Skipped
    ) {
      return this.goToNextTask();
    }
    this.progress[this.indexOfCurrentTask].startTask();
    this.notifySubscriber();
    return this.getCurrentTask();
  }

  public getProgress(): TrackableTask[] {
    return this.progress;
  }
}

export default GroupProgress;
