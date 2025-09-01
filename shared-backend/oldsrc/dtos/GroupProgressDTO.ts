import GroupProgress from "../entities/GroupProgress";
import TrackableTaskDTO from "./TrackableTaskDTO";

// a data transferable object to transfer an group progress
class GroupProgressDTO {
  public readonly progress: TrackableTaskDTO[];
  public readonly startedAt: Date;
  public readonly finishedAfterSeconds: number | null;
  public readonly finishedWork: boolean;

  constructor(groupProgress: GroupProgress) {
    let progressDTO: TrackableTaskDTO[] = [];
    // iterate through the progress of the group progress and create a TrackableTaskDTO for each task
    for (let i = 0; i < groupProgress.getProgress().length; i++) {
      if (groupProgress.getFinishedAfterSeconds() !== null) {
        progressDTO.push(
          new TrackableTaskDTO(groupProgress.getProgress()[i], false),
        );
      } else if (i > groupProgress.getIndexOfCurrentTask()) {
        progressDTO.push(
          new TrackableTaskDTO(groupProgress.getProgress()[i], true),
        );
      } else {
        progressDTO.push(
          new TrackableTaskDTO(groupProgress.getProgress()[i], false),
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
