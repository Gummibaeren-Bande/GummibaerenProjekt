import Group from "../../entities/Group";
import GroupSet from "../../entities/GroupSet";
import CallbackSuccess from "../../types/callback-types/CallbackSuccess";
import TaskService from "../task/TaskService";
import GroupSetServiceEmits from "./interfaces/GroupSetServiceEmits";
import GroupSetServiceListeners from "./interfaces/GroupSetServiceListeners";

class GroupSetService
  implements GroupSetServiceEmits, GroupSetServiceListeners
{
  private readonly groupSet: GroupSet;
  private readonly taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
    this.groupSet = new GroupSet();
    console.log("Group Set service was successfully started");
  }

  public getGroupSet(): GroupSet {
    return this.groupSet;
  }

  addGroup(name: string, callback: CallbackSuccess): void {
    const successful = this.groupSet.addNewGroup(
      name,
      this.taskService.getTaskSet(),
    );

    if (!successful) {
      callback({
        success: false,
        message: `Eine Gruppe mit dem Namen "${name}" existiert bereits. Bitte wählt einen anderen Namen`,
      });
      return;
    }
    callback({
      success: true,
      message: `Die Gruppe "${name}" wurde erfolgreich erstellt`,
    });
  }
}

export default GroupSetService;
