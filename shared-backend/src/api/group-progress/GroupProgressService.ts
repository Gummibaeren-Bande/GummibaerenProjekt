import GroupProgress from "../../entities/GroupProgress";
import CallbackNumber from "../../types/callback-types/CallbackNumber";
import GroupService from "../group/GroupService";

class GroupProgressService {
  private readonly groupService: GroupService;

  constructor(groupService: GroupService) {
    this.groupService = groupService;
    console.log("Group progress service was successfully started");
  }

  public getGroupProgressByGroupName(groupName: string): GroupProgress {
    return this.groupService.getGroupByName(groupName).getGroupProgress();
  }

  // TODO: register as Listener, handle callback, register method in handler
  /**
   * get the number of task already finished by the given group
   *
   * @param groupName the name of the given group
   * @param callback the callback to send back the number of finished tasks
   */
  public getNumberOfFinishedTasks(groupName: string, callback: CallbackNumber) {
    const numberOfFinishedTasks =
      this.getGroupProgressByGroupName(groupName).getNumberOfFinishedTasks();
  }
}

export default GroupProgressService;
