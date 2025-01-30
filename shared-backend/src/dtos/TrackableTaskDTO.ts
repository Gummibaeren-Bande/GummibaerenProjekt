import TrackableTask from "../entities/TrackableTask";
import TrackableTaskState from "../enums/TrackableTaskState";
import TaskDTO from "./TaskDTO";

// a dto to transfer a trackable task
class TrackableTaskDTO {
  public readonly task: TaskDTO;
  public readonly chosenExerciseIndex: number;
  public readonly startedAt: Date | null;
  public readonly finishedAfterSeconds: number | null;
  public readonly tries: number;
  public readonly state: TrackableTaskState;
  public readonly isSkipRevertable: boolean;

  constructor(trackableTask: TrackableTask, revertCheck: boolean) {
    this.task = new TaskDTO(trackableTask.getTask());
    this.chosenExerciseIndex = trackableTask.getChosenExerciseIndex();
    this.startedAt = trackableTask.getStartedAt();
    this.finishedAfterSeconds = trackableTask.getFinishedAfterSeconds();
    this.tries = trackableTask.getTries();
    this.state = trackableTask.getState();
    if (revertCheck) {
      this.isSkipRevertable = this.checkIfSkipRevertable();
    } else {
      this.isSkipRevertable = false;
    }
  }

  public checkIfSkipRevertable(): boolean {
    return this.state === TrackableTaskState.Skipped;
  }
}

export default TrackableTaskDTO;
