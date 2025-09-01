import CallbackSuccess from "../../../types/callback-types/CallbackSuccess";
import CallbackNumber from "../../../types/callback-types/CallbackNumber";
interface GroupProgressServiceListener {
  /**
   * finish the work of the given group
   *
   * @param groupName the name of the group that finishes their work
   * @param callback the callback to send back wether this action was successful or not
   */
  finishWork: (groupName: string, callback: CallbackSuccess) => void;
  /**
   * get the number of task already finished by the given group
   *
   * @param groupName the name of the given group
   * @param callback the callback to send back the number of finished tasks
   */
  getNumberOfFinishedTasks: (
    groupName: string,
    callback: CallbackNumber,
  ) => void;
}

export default GroupProgressServiceListener;
