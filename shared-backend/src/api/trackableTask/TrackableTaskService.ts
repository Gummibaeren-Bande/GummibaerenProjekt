import TrackableTask from "../../entities/TrackableTask";
import CallbackNumber from "../../types/callback-types/CallbackNumber";
import GroupProgressService from "../group-progress/GroupProgressService";
import TrackableTaskServiceListener from "./interfaces/TrackableTaskServiceListener";

class TrackableTaskService implements TrackableTaskServiceListener {
  private readonly groupProgressService: GroupProgressService;

  constructor(groupProgressService: GroupProgressService) {
    this.groupProgressService = groupProgressService;
    console.log("Trackable Task service was successfully started");
  }

  public getCurrentTaskByGroupName(
    groupName: string
  ): TrackableTask | undefined {
    return this.groupProgressService
      .getGroupProgressByGroupName(groupName)
      ?.getCurrentTask();
  }

  /**
   * just marks the current task as completed, doesnt go to the next task in GroupProgress, as this is a seperate call.
   *
   * @param groupName the group name that completed the task
   */
  public handleTaskCompleted(groupName: string) {
    const currentTask = this.getCurrentTaskByGroupName(groupName);
    if (!currentTask) {
      throw new Error("current Task not found for the given group name");
    }
    currentTask.complete();
  }

  /**
   * get the index of the chosen alternative excercise for the task with the given id for the given group.
   *
   * @param taskId the id of the task to get the alternative index for
   * @param groupName the name of the group to get the alternative index for
   */
  public getAlternativeIndexbyTaskId(
    taskId: string,
    groupName: string,
    callback: CallbackNumber
  ) {
    const groupProgress =
      this.groupProgressService.getGroupProgressByGroupName(groupName);
    if (!groupProgress) {
      throw new Error("Group progress not found for this group!");
    }
    const task = groupProgress.getTaskById(taskId);
    if (!task) {
      throw new Error("task with the given id could not be found!");
    }
    callback({ number: task.getChosenIndex() });
  }

  /**
   * mark the task with the given id for the given group as skipped.
   *
   * @param taskId the id of the task to skip
   * @param groupName the name of the group to skip the task for
   */
  public skipTask(taskId: string, groupName: string) {
    const groupProgress =
      this.groupProgressService.getGroupProgressByGroupName(groupName);
    if (!groupProgress) {
      throw new Error("Group progress not found for this group!");
    }
    const task = groupProgress.getTaskById(taskId);
    if (!task) {
      throw new Error("task with the given id could not be found!");
    }
    task.setSkipped(true);
  }

  /**
   * revert the skiped marking of the task with the given id for the given group.
   *
   * @param taskId the id of the task to unskip
   * @param groupName the name of the group to unskip the task for
   */
  public revertTaskSkip(taskId: string, groupName: string) {
    const groupProgress =
      this.groupProgressService.getGroupProgressByGroupName(groupName);
    if (!groupProgress) {
      throw new Error("Group progress not found for this group!");
    }
    const task = groupProgress.getTaskById(taskId);
    if (!task) {
      throw new Error("task with the given id could not be found!");
    }
    task.setSkipped(false);
  }

  /**
   * choose an alternative Excercise for the task with the given id for the given group name
   *
   * @param taskId the id of the task to choose the alternative excercise for
   * @param groupName the name of the group which gets the alternative excercise
   * @param indexOfAlternative the index of the alternative excercise
   */
  public chooseAlternativForTask(
    taskId: string,
    groupName: string,
    indexOfAlternative: number
  ) {
    const groupProgress =
      this.groupProgressService.getGroupProgressByGroupName(groupName);
    if (!groupProgress) {
      throw new Error("Group progress not found for this group!");
    }
    const task = groupProgress.getTaskById(taskId);
    if (!task) {
      throw new Error("task with the given id could not be found!");
    }
    task.setAlternativeExercise(indexOfAlternative);
  }

  public getHasNextTaskByGroupName(groupName: string): boolean | undefined {
    return this.groupProgressService.hasNextTask(groupName);
  }

  public getNextTaskOfGroup(groupName: string) {
    return this.groupProgressService.goToNextTask(groupName);
  }
}

export default TrackableTaskService;
