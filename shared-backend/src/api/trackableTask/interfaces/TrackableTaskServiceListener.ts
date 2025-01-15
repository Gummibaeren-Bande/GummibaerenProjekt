import CallbackNumber from "../../../types/callback-types/CallbackNumber";

interface TrackableTaskServiceListener {
  skipTask: (taskId: string, groupName: string) => void;
  revertTaskSkip: (taskId: string, groupName: string) => void;
  chooseAlternativForTask: (
    taskId: string,
    groupName: string,
    indexOfAlternative: number
  ) => void;
  getAlternativeIndexbyTaskId: (
    taskId: string,
    groupName: string,
    callback: CallbackNumber
  ) => void;
}

export default TrackableTaskServiceListener;
