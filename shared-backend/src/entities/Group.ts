import GroupProgress from "./GroupProgress";
import TaskSet from "./TaskSet";

class Group {
  private readonly name: string;
  private readonly groupProgress: GroupProgress;

  constructor(name: string, taskSet: TaskSet) {
    this.name = name;
    this.groupProgress = new GroupProgress(taskSet);
  }

  public getName() {
    return this.name;
  }

  /**
   * get the next task for this group
   */
  public nextTask(): any {
    throw new Error("Not implemented yet!");
  }
}

export default Group;
