import TrackableTaskState from "../enums/TrackableTaskState";
import TaskSet from "./TaskSet";
import TrackableTask from "./TrackableTask";
/**
 * This class is used to track the progress of a group on their tasks.
 */
class GroupProgress {
  private readonly progress: TrackableTask[];
  private startedAt: Date;
  private finishedAfterSeconds: number | null;
  private indexOfCurrentTask = 0;

  constructor(taskSet: TaskSet) {
    this.progress = [];
    for (const task of taskSet.getTasks()) {
      this.progress.push(new TrackableTask(task));
    }
    this.indexOfCurrentTask = 0;
    this.startedAt = new Date();
    this.finishedAfterSeconds = null;
  }

  public getStartedAt(): Date {
    return this.startedAt;
  }
  public getCurrentTask(): TrackableTask {
    return this.progress[this.indexOfCurrentTask];
  }

  public getNumberOfFinishedTasks(): number {
    let counter = 0;
    for (const task of this.progress) {
      if (task.state == TrackableTaskState.Completed) {
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
   * It throws an error if there are still unfinished tasks left.
   */
  public finishWork() {
    if (this.hasNextTask()) {
      throw new Error(
        "The group progress can't be finished, there are still unfinished tasks left.",
      );
    }
    this.stopTimer();
  }

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
    return this.indexOfCurrentTask < this.progress.length - 1;
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
      this.progress[this.indexOfCurrentTask].state !==
      TrackableTaskState.Completed
    ) {
      throw new Error("The current task has not been completed yet");
    }
    this.indexOfCurrentTask++;
    this.progress[this.indexOfCurrentTask].startTask();
    return this.getCurrentTask();
  }
}

export default GroupProgress;
