import CallbackSuccess from "../../../types/callback-types/CallbackSuccess";

interface TrackableTaskServiceListener {
  skipTask: (
    taskId: string,
    groupName: string,
    callback: CallbackSuccess,
  ) => void;
  revertTaskSkip: (
    taskId: string,
    groupName: string,
    callback: CallbackSuccess,
  ) => void;
  chooseAlternativForTask: (
    taskId: string,
    groupName: string,
    indexOfAlternative: number,
    callback: CallbackSuccess,
  ) => void;
}

export default TrackableTaskServiceListener;
