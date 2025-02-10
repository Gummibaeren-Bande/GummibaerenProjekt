import CallbackNumberDTO from "../../dtos/CallbackDTOs/CallbackNumberDTO";
import CallbackSuccessDTO from "../../dtos/CallbackDTOs/CallbackSuccessDTO";
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
   * @param groupName the name of the given group
   * @returns true if the group has a next task
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
      //This Error is never reached
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
      callback(
        new CallbackSuccessDTO(false, "Es gibt noch Aufgaben zu erledigen"),
      );
      return;
    }
    const groupProgress = this.getGroupProgressByGroupName(groupName);
    if (!groupProgress) {
      callback(new CallbackSuccessDTO(false, "Group progress nicht gefunden"));
      return;
    }
    try {
      groupProgress.finishWork();
      callback(new CallbackSuccessDTO(true, "Alle Aufgaben wurden erledigt"));
    } catch (error) {
      if (error instanceof Error) {
        callback(new CallbackSuccessDTO(false, error.message));
      } else {
        //This Error is never reached
        callback(new CallbackSuccessDTO(false, "An unknown error occurred"));
      }
    }
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
      callback(
        new CallbackNumberDTO(false, "Group progress nicht gefunden", -1),
      );
      return;
    }
    const numberOfFinishedTasks = groupProgress.getNumberOfFinishedTasks();
    callback(new CallbackNumberDTO(true, "", numberOfFinishedTasks));
  }
}

export default GroupProgressService;
