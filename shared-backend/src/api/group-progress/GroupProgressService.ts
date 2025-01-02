import GroupProgress from "../../entities/GroupProgress";
import TrackableTask from "../../entities/TrackableTask";
import CallbackNumber from "../../types/callback-types/CallbackNumber";
import CallbackSuccess from "../../types/callback-types/CallbackSuccess";
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

  public hasNextTask(groupName: string): boolean {
    return this.getGroupProgressByGroupName(groupName).hasNextTask();
  }

  public goToNextTask(groupName: string): TrackableTask {
    if (!this.hasNextTask(groupName)) {
      throw new Error("there is no next task for this group!");
    }
    return this.getGroupProgressByGroupName(groupName).goToNextTask();
  }

  // TODO: register as Listener, handle callback, register method in handler
  public finishWork(groupName: string, callback: CallbackSuccess) {
    if (this.hasNextTask(groupName)) {
      // TODO: callback failure because of unfinished tasks
      callback({
        success: false,
        message: "Es gibt noch unerledigte Aufgaben",
      });
      return;
    }
    this.getGroupProgressByGroupName(groupName).finishWork();
    // TODO: callback success
    callback({ success: true, message: "Alle Aufgaben wurden erledigt" });
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
    callback({ number: numberOfFinishedTasks });
  }
}

export default GroupProgressService;
