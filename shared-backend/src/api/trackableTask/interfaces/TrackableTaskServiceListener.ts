import CallbackSuccess from "../../../types/callback-types/CallbackSuccess";

interface TrackableTaskServiceListener {
  /**
   * mark the task with the given id for the given group as skipped.
   *
   * @param taskId the id of the task to skip
   * @param groupName the name of the group to skip the task for
   */
  skipTask: (
    taskId: string,
    groupName: string,
    callback: CallbackSuccess,
  ) => void;

  /**
   * revert the skipped marking of the task with the given id for the given group.
   *
   * @param taskId the id of the task to unskip
   * @param groupName the name of the group to unskip the task for
   */
  revertTaskSkip: (
    taskId: string,
    groupName: string,
    callback: CallbackSuccess,
  ) => void;

  /**
   * choose an alternative Exercise for the task with the given id for the given group name
   *
   * @param taskId the id of the task to choose the alternative exercise for
   * @param groupName the name of the group which gets the alternative exercise
   * @param exerciseId the id of the alternative exercise
   */
  chooseAlternativForTask: (
    taskId: string,
    groupName: string,
    exerciseId: string,
    callback: CallbackSuccess,
  ) => void;
}

export default TrackableTaskServiceListener;
