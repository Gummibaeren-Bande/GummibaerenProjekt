import GroupProgress from "./GroupProgress";
import TaskSet from "./TaskSet";

/**
 * This class represents a group in the database.
 */
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

  public getGroupProgress(): GroupProgress {
    return this.groupProgress;
  }
}

export default Group;
