import TaskSet from "./TaskSet";
import TrackableTask from "./TrackableTask";

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

  public finishWork() {
    if (this.hasNextTask()) {
      throw new Error(
        "the group progress can't be finished, there are still unfinished tasks left.",
      );
    }
    this.finishedWork = true;
    this.stopTimer();
  }

  private stopTimer() {
    const started = this.getStartedAt();
    if (!started) {
      throw new Error(
        "The group was not started yet and can't therefore not be finished",
      );
    }
    this.finishedAfterSeconds =
      (new Date().getTime() - started.getTime()) / 1000;
  }

  public hasNextTask(): boolean {
    throw new Error("Not Implemented Yet!");
  }

  public goToNextTask(): TrackableTask {
    // if there are no more tasks left to work on, dont call finishWork(), throw an error instead
    throw new Error("Not Implemented Yet!");
  }

  public getCurrentTask(): TrackableTask {
    return this.progress[this.indexOfCurrentTask];
  }

  public getNumberOfFinishedTasks(): number {
    throw new Error("Not Implemented Yet!");
  }

  public getTaskById(id: string): TrackableTask {
    throw new Error("Not Implemented Yet!");
  }
}

export default GroupProgress;
