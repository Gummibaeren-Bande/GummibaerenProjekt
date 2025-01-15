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

  constructor(trackableTask: TrackableTask) {
    this.task = new TaskDTO(trackableTask.getTask());
    this.chosenExerciseIndex = trackableTask.getChosenExerciseIndex();
    this.startedAt = trackableTask.getStartedAt();
    this.finishedAfterSeconds = trackableTask.getFinishedAfterSeconds();
    this.tries = trackableTask.getTries();
    this.state = trackableTask.getState();
  }
}

export default TrackableTaskDTO;
