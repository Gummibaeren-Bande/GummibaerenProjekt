import TrackableTask from "../../entities/TrackableTask";
import GroupProgressService from "../group-progress/GroupProgressService";
import TrackableTaskServiceListener from "./interfaces/TrackableTaskServiceListener";

class TrackableTaskService implements TrackableTaskServiceListener {
  private readonly groupProgressService: GroupProgressService;

  constructor(groupProgressService: GroupProgressService) {
    this.groupProgressService = groupProgressService;
    console.log("Trackable Task service was successfully started");
  }

  public getCurrentTaskByGroupName(groupName: string): TrackableTask {
    return this.groupProgressService
      .getGroupProgressByGroupName(groupName)
      .getCurrentTask();
  }

  /**
   * just marks the current task as completed, doesnt go to the next task in GroupProgress, as this is a seperate call.
   *
   * @param groupName the group name that completed the task
   */
  public handleTaskCompleted(groupName: string) {
    const currentTask = this.getCurrentTaskByGroupName(groupName);
    currentTask.complete();
  }

  // TODO: register method in listener an put into handler
  /**
   * mark the task with the given id for the given group as skipped.
   *
   * @param taskId the id of the task to skip
   * @param groupName the name of the group to skip the task for
   */
  public skipTask(taskId: string, groupName: string) {
    this.groupProgressService
      .getGroupProgressByGroupName(groupName)
      .getTaskById(taskId)
      .setSkipped(true);
  }

  // TODO: register method in listener an put into handler
  /**
   * revert the skiped marking of the task with the given id for the given group.
   *
   * @param taskId the id of the task to unskip
   * @param groupName the name of the group to unskip the task for
   */
  public revertTaskSkip(taskId: string, groupName: string) {
    this.groupProgressService
      .getGroupProgressByGroupName(groupName)
      .getTaskById(taskId)
      .setSkipped(false);
  }

  // TODO: register method in listener an put into handler
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
    this.groupProgressService
      .getGroupProgressByGroupName(groupName)
      .getTaskById(taskId)
      .setAlternativeExercise(indexOfAlternative);
  }

  public getHasNextTaskByGroupName(groupName: string): boolean {
    return this.groupProgressService.hasNextTask(groupName);
  }

  public getNextTaskOfGroup(groupName: string) {
    return this.groupProgressService.goToNextTask(groupName);
  }
}

export default TrackableTaskService;
