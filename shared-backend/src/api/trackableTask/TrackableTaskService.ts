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
   * just marks the current task as completed, doesn't go to the next task in GroupProgress, as this is a separate call.
   *
   * @param groupName the group name that completed the task
   */
  public handleTaskCompleted(groupName: string) {
    const currentTask = this.getCurrentTaskByGroupName(groupName);
    if (!currentTask) {
      throw new Error("Current Task not found for the given group name");
    }
    currentTask.complete();
  }

  /**
   * mark the task with the given id for the given group as skipped.
   *
   * @param taskId the id of the task to skip
   * @param groupName the name of the group to skip the task for
   */
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
          "Der Progress dieser Gruppe konnte nicht gefunden werden",
        ),
      );
      return;
    }
    const task = groupProgress.getTaskById(taskId);
    if (!task) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Task mit der gegebenen ID konnte nicht gefunden werden",
        ),
      );
      return;
    }
    try {
      task.setSkipped(true);
      callback(
        new CallbackSuccessDTO(true, "Task wurde erfolgreich übersprungen"),
      );
    } catch (error) {
      if (error instanceof Error) {
        callback(new CallbackSuccessDTO(false, error.message));
      } else {
        //This Error is never reached
        callback(
          new CallbackSuccessDTO(
            false,
            "Ein unbekannter Fehler ist aufgetreten",
          ),
        );
      }
    }
  }

  /**
   * revert the skipped marking of the task with the given id for the given group.
   *
   * @param taskId the id of the task to un-skip
   * @param groupName the name of the group to un-skip the task for
   */
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
          "Der Progress dieser Gruppe konnte nicht gefunden werden",
        ),
      );
      return;
    }
    const task = groupProgress.getTaskById(taskId);
    if (!task) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Task mit der gegebenen ID konnte nicht gefunden werden",
        ),
      );
      return;
    }
    try {
      task.setSkipped(false);
      callback(
        new CallbackSuccessDTO(
          true,
          "Das Überspringen wurde erfolgreich rückgängig gemacht",
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        callback(new CallbackSuccessDTO(false, error.message));
      } else {
        callback(
          new CallbackSuccessDTO(
            false,
            "Ein unbekannter Fehler ist aufgetreten",
          ),
        );
      }
    }
  }

  /**
   * choose an alternative Exercise for the task with the given id for the given group name
   *
   * @param taskId the id of the task to choose the alternative exercise for
   * @param groupName the name of the group which gets the alternative exercise
   * @param exerciseId the id of the alternative exercise
   */
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
          "Der Progress dieser Gruppe konnte nicht gefunden werden",
        ),
      );
      return;
    }
    const task = groupProgress.getTaskById(taskId);
    if (!task) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Task mit der gegebenen ID konnte nicht gefunden werden",
        ),
      );
      return;
    }
    try {
      task.setAlternativeExerciseById(exerciseId);
      callback(
        new CallbackSuccessDTO(
          true,
          "Alternative exercise wurde erfolgreich festgelegt",
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        callback(new CallbackSuccessDTO(false, error.message));
      } else {
        //This Error is never reached
        callback(
          new CallbackSuccessDTO(
            false,
            "Ein unbekannter Fehler ist aufgetreten",
          ),
        );
      }
    }
  }

  public getHasNextTaskByGroupName(groupName: string): boolean | undefined {
    return this.groupProgressService.hasNextTask(groupName);
  }

  public getNextTaskOfGroup(groupName: string) {
    return this.groupProgressService.goToNextTask(groupName);
  }

  public registerWrongAnswer(groupName: string) {
    this.groupProgressService
      .getGroupProgressByGroupName(groupName)
      ?.getCurrentTask()
      .registerWrongAnswer();
  }
}

export default TrackableTaskService;
