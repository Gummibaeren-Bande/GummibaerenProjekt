import TaskSet from "./TaskSet";
import TrackableTask from "./TrackableTask";
/**
 * This class is used to track the progress of a group on their tasks.
 */
class GroupProgress {
  private readonly progress: TrackableTask[];
  private startedAt: Date | null;
  private finishedAfterSeconds: number | null;
  private finishedWork: boolean;
  private indexOfCurrentTask = 0;

  constructor(taskSet: TaskSet) {
    this.progress = [];
    for (const task of taskSet.getTasks()) {
      this.progress.push(new TrackableTask(task));
    }
    this.indexOfCurrentTask = 0;
    this.startedAt = new Date();
    this.finishedAfterSeconds = null;
    this.finishedWork = false;
  }

  public getStartedAt(): Date | null {
    return this.startedAt;
  }
  public getCurrentTask(): TrackableTask {
    return this.progress[this.indexOfCurrentTask];
  }

  public getNumberOfFinishedTasks(): number {
    let counter = 0;
    for (const task of this.progress) {
      if (task.state === "Completed") {
        counter++;
      }
    }
    return counter;
  }

  public getTaskById(id: string): TrackableTask {
    for (const task of this.progress) {
      if (task.getTask().getId() === id) {
        return task;
      }
    }
    throw new Error("No task with the given id found");
  }

  public getFinishedAfterSeconds(): number | null {
    return this.finishedAfterSeconds;
  }

  public getFinishedWork(): boolean {
    return this.finishedWork;
  }

  /**
   * This method is used to finish the group progress.
   * It throws an error if there are still unfinished tasks left.
   */
  public finishWork() {
    if (this.hasNextTask()) {
      throw new Error(
        "the group progress can't be finished, there are still unfinished tasks left."
      );
    }
    this.progress[this.indexOfCurrentTask].complete();
    this.finishedWork = true;
    this.stopTimer();
  }

  private stopTimer() {
    const started = this.getStartedAt();
    if (!started) {
      throw new Error(
        "The group was not started yet and can't therefore not be finished"
      );
    }
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
    this.progress[this.indexOfCurrentTask].complete();
    this.indexOfCurrentTask++;
    return this.getCurrentTask();
  }
}

export default GroupProgress;
