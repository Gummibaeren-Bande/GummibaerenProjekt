import GroupSet from "../entities/GroupSet";
import TaskSet from "../entities/TaskSet";
import GroupDTO from "./GroupDTO";
import TaskDTO from "./TaskDTO";

// a data transferable object to transfer an group set
class CurrentStateDTO {
  public readonly groups: GroupDTO[];
  public readonly tasks: TaskDTO[];

  constructor(groupSet: GroupSet, taskSet: TaskSet) {
    this.groups = groupSet.getGroupList().map((group) => new GroupDTO(group));
    this.tasks = taskSet.getTasks().map((t) => new TaskDTO(t));
  }
}

export default CurrentStateDTO;
