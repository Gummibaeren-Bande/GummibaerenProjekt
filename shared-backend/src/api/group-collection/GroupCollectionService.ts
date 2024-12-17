import Group from "../../entities/Group";
import GroupCollection from "../../entities/GroupCollection";
import CallbackSuccess from "../../types/callback-types/CallbackSuccess";
import TaskService from "../task/TaskService";
import GroupCollectionServiceEmits from "./interfaces/GroupCollectionServiceEmits";
import GroupCollectionServiceListeners from "./interfaces/GroupCollectionServiceListeners";

class GroupCollectionService
  implements GroupCollectionServiceEmits, GroupCollectionServiceListeners
{
  private readonly groupCollection: GroupCollection;
  private readonly taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
    this.groupCollection = new GroupCollection();
    console.log("Group Collection service was successfully started");
  }

  // TODO: register method in handler, do the emit, i still have to thing about, how the emit is carried out...
  // notes for the emit:
  // * maybe its better to emit more granular
  // * the emit should only go to the teachers-frontend!
  /**
   * return the current groupCollection after a change in the data
   *
   * @returns the new groupCollection to emit
   */
  public emitChangedGroupCollection(): GroupCollection {
    return this.groupCollection;
  }

  public getGroupCollection(): GroupCollection {
    return this.groupCollection;
  }

  addGroup(name: string, callback: CallbackSuccess): void {
    const successful = this.groupCollection.addNewGroup(
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

export default GroupCollectionService;
