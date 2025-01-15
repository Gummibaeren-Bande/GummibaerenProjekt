import GroupProgress from "../entities/GroupProgress";
import TrackableTaskDTO from "./TrackableTaskDTO";

// a dto to transfer an group progress
class GroupProgressDTO {
  public readonly progress: TrackableTaskDTO[];
  public readonly startedAt: Date;
  public readonly finishedAfterSeconds: number | null;
  public readonly finishedWork: boolean;

  constructor(groupProgress: GroupProgress) {
    this.progress = groupProgress
      .getProgress()
      .map((tt) => new TrackableTaskDTO(tt));
    this.startedAt = groupProgress.getStartedAt();
    this.finishedAfterSeconds = groupProgress.getFinishedAfterSeconds();
    this.finishedWork = groupProgress.getFinishedWork();
  }
}

export default GroupProgressDTO;
