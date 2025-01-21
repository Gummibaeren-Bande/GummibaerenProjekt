interface TrackableTaskServiceListener {
  skipTask: (taskId: string, groupName: string) => void;
  revertTaskSkip: (taskId: string, groupName: string) => void;
  chooseAlternativForTask: (
    taskId: string,
    groupName: string,
    indexOfAlternative: number,
  ) => void;
}

export default TrackableTaskServiceListener;
