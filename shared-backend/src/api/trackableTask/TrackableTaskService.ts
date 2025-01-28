import CallbackSuccessDTO from "../../dtos/CallbackDTOs/CallbackSuccessDTO";
import TrackableTask from "../../entities/TrackableTask";
import CallbackSuccess from "../../types/callback-types/CallbackSuccess";
import GroupProgressService from "../group-progress/GroupProgressService";
import TrackableTaskServiceListener from "./interfaces/TrackableTaskServiceListener";

class TrackableTaskService implements TrackableTaskServiceListener {
  private readonly groupProgressService: GroupProgressService;

  constructor(groupProgressService: GroupProgressService) {
    this.groupProgressService = groupProgressService;
    console.log("Trackable Task service was successfully started");
  }

  public getCurrentTaskByGroupName(
    groupName: string,
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
      //This Error is never reached
      throw new Error("Current Task not found for the given group name");
    }
    currentTask.complete();
  }

  public skipTask(
    taskId: string,
    groupName: string,
    callback: CallbackSuccess,
  ) {
    const groupProgress =
      this.groupProgressService.getGroupProgressByGroupName(groupName);
    if (!groupProgress) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Group progress not found for this group!",
        ),
      );
      return;
    }
    const task = groupProgress.getTaskById(taskId);
    if (!task) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Task with the given id could not be found!",
        ),
      );
      return;
    }
    try {
      task.setSkipped(true);
      callback(new CallbackSuccessDTO(true, "Task was successfully skipped"));
    } catch (error) {
      if (error instanceof Error) {
        callback(new CallbackSuccessDTO(false, error.message));
      } else {
        //This Error is never reached
        callback(new CallbackSuccessDTO(false, "An unknown error occurred"));
      }
    }
  }

  public revertTaskSkip(
    taskId: string,
    groupName: string,
    callback: CallbackSuccess,
  ) {
    const groupProgress =
      this.groupProgressService.getGroupProgressByGroupName(groupName);
    if (!groupProgress) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Group progress not found for this group!",
        ),
      );
      return;
    }
    const task = groupProgress.getTaskById(taskId);
    if (!task) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Task with the given id could not be found!",
        ),
      );
      return;
    }
    try {
      task.setSkipped(false);
      callback(new CallbackSuccessDTO(true, "Task skip successfully reverted"));
    } catch (error) {
      if (error instanceof Error) {
        callback(new CallbackSuccessDTO(false, error.message));
      } else {
        //This Error is never reached
        callback(new CallbackSuccessDTO(false, "An unknown error occurred"));
      }
    }
  }

  public chooseAlternativForTask(
    taskId: string,
    groupName: string,
    exerciseId: string,
    callback: CallbackSuccess,
  ) {
    const groupProgress =
      this.groupProgressService.getGroupProgressByGroupName(groupName);
    if (!groupProgress) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Group progress not found for this group!",
        ),
      );
      return;
    }
    const task = groupProgress.getTaskById(taskId);
    if (!task) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Task with the given id could not be found!",
        ),
      );
      return;
    }
    try {
      task.setAlternativeExerciseById(exerciseId);
      callback(
        new CallbackSuccessDTO(
          true,
          "Alternative exercise was successfully chosen",
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        callback(new CallbackSuccessDTO(false, error.message));
      } else {
        //This Error is never reached
        callback(new CallbackSuccessDTO(false, "An unknown error occurred"));
      }
    }
  }

  public getHasNextTaskByGroupName(groupName: string): boolean | undefined {
    return this.groupProgressService.hasNextTask(groupName);
  }

  public getNextTaskOfGroup(groupName: string) {
    return this.groupProgressService.goToNextTask(groupName);
  }

  public incrementAttempts(groupName: string) {
    this.groupProgressService
      .getGroupProgressByGroupName(groupName)
      ?.getCurrentTask()
      .incrementTries();
  }
}

export default TrackableTaskService;
