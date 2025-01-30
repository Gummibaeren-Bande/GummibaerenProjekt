import GroupProgress from "../entities/GroupProgress";
import TrackableTaskDTO from "./TrackableTaskDTO";

// a dto to transfer an group progress
class GroupProgressDTO {
  public readonly progress: TrackableTaskDTO[];
  public readonly startedAt: Date;
  public readonly finishedAfterSeconds: number | null;
  public readonly finishedWork: boolean;

  constructor(groupProgress: GroupProgress) {
    let progressDTO: TrackableTaskDTO[] = [];
    for (let i = 0; i < groupProgress.getProgress().length; i++) {
      if (i > groupProgress.getIndexOfCurrentTask()) {
        progressDTO.push(
          new TrackableTaskDTO(groupProgress.getProgress()[i], true)
        );
      } else {
        progressDTO.push(
          new TrackableTaskDTO(groupProgress.getProgress()[i], false)
        );
      }
    }
    this.progress = progressDTO;
    this.startedAt = groupProgress.getStartedAt();
    this.finishedAfterSeconds = groupProgress.getFinishedAfterSeconds();
    this.finishedWork = groupProgress.getFinishedWork();
  }
}

export default GroupProgressDTO;
