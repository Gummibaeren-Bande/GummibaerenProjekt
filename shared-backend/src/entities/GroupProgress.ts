import TaskSet from "./TaskSet";
import TrackableTask from "./TrackableTask";

class GroupProgress {
  private readonly progress: TrackableTask[];

  constructor(taskSet: TaskSet) {
    this.progress = [];
    for (const task of taskSet.getTasks()) {
        this.progress.push(new TrackableTask(task))
    }
  }
}

export default GroupProgress;
