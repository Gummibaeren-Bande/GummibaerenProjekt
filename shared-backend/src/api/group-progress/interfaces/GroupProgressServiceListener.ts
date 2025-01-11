import CallbackSuccess from "../../../types/callback-types/CallbackSuccess";
import CallbackNumber from "../../../types/callback-types/CallbackNumber";
interface GroupProgressServiceListener {
  finishWork: (groupName: string, callback: CallbackSuccess) => void;
  getNumberOfFinishedTasks: (
    groupName: string,
    callback: CallbackNumber,
  ) => void;
}

export default GroupProgressServiceListener;
