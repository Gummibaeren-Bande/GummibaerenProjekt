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

  // TODO: register method in handler, do the emit, i still have to thing about, how the emit is carried out...
  // notes for the emit:
  // * maybe its better to emit more granular
  // * the emit should only go to the teachers-frontend!
  /**
   * return the current groupSet after a change in the data
   *
   * @returns the new groupSet to emit
   */
  public emitChangedGroupSet(): GroupSet {
    return this.groupSet;
  }

  public getGroupSet(): GroupSet {
    return this.groupSet;
  }

  addGroup(name: string, callback: CallbackSuccess): void {
    const successful = this.groupSet.addNewGroup(
      name,
      this.taskService.getTaskSet()
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
