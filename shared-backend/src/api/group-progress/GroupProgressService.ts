import GroupProgress from "../../entities/GroupProgress";
import TrackableTask from "../../entities/TrackableTask";
import CallbackNumber from "../../types/callback-types/CallbackNumber";
import CallbackSuccess from "../../types/callback-types/CallbackSuccess";
import GroupService from "../group/GroupService";
import GroupProgressServiceListener from "./interfaces/GroupProgressServiceListener";

class GroupProgressService implements GroupProgressServiceListener {
  private readonly groupService: GroupService;

  constructor(groupService: GroupService) {
    this.groupService = groupService;
    console.log("Group progress service was successfully started");
  }

  public getGroupProgressByGroupName(
    groupName: string,
  ): GroupProgress | undefined {
    return this.groupService.getGroupByName(groupName)?.getGroupProgress();
  }

  /**
   * tests if the group has a next task
   *
   * @param groupName the anme of the given group
   * @returns ture if the group has a next task
   */
  public hasNextTask(groupName: string): boolean | undefined {
    return this.getGroupProgressByGroupName(groupName)?.hasNextTask();
  }

  /**
   * advances the given group to the next task
   * and throws an error if there is no next task
   *
   * @param groupName the name of the group to get the next task for
   * @returns the next task of the group
   */
  public goToNextTask(groupName: string): TrackableTask {
    if (!this.hasNextTask(groupName)) {
      throw new Error("there is no next task for this group!");
    }
    const groupProgress = this.getGroupProgressByGroupName(groupName);
    if (!groupProgress) {
      throw new Error("Group progress not found for this group!");
    }
    return groupProgress.goToNextTask();
  }

  /**
   * finish the work of the given group
   *
   * @param groupName the name of the group that finishes their work
   * @param callback the callback to send back wether this action was successful or not
   */
  public finishWork(groupName: string, callback: CallbackSuccess) {
    if (this.hasNextTask(groupName)) {
      callback({
        success: false,
        message: "Es gibt noch unerledigte Aufgaben",
      });
      return;
    }
    const groupProgress = this.getGroupProgressByGroupName(groupName);
    if (!groupProgress) {
      throw new Error("Group progress not found for this group!");
    }
    groupProgress.finishWork();
    callback({ success: true, message: "Alle Aufgaben wurden erledigt" });
  }

  /**
   * get the number of task already finished by the given group
   *
   * @param groupName the name of the given group
   * @param callback the callback to send back the number of finished tasks
   */
  public getNumberOfFinishedTasks(groupName: string, callback: CallbackNumber) {
    const groupProgress = this.getGroupProgressByGroupName(groupName);
    if (!groupProgress) {
      throw new Error("Group progress not found for this group!");
    }
    const numberOfFinishedTasks = groupProgress.getNumberOfFinishedTasks();
    callback({ number: numberOfFinishedTasks });
  }
}

export default GroupProgressService;
