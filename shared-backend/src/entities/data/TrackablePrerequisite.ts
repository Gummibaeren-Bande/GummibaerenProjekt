import TrackableTask from "./TrackableTask";
import TrackableTaskState from "../../enums/TrackableTaskState";

class TrackablePrerequisite {
  private readonly trackedTask: TrackableTask;
  private readonly trackedRequirement: TrackableTask;
  private readonly equals: boolean;
  private readonly state: TrackableTaskState;

  constructor(
    trackedTask: TrackableTask,
    trackedRequirement: TrackableTask,
    equals: boolean,
    state: TrackableTaskState
  ) {
    this.trackedTask = trackedTask;
    this.trackedRequirement = trackedRequirement;
    this.equals = equals;
    this.state = state;
  }
  public evaluate(): boolean {
    return this.equals === (this.trackedRequirement.getState() === this.state);
  }
  public getTrackedTask(): TrackableTask {
    return this.trackedTask;
  }
}

export default TrackablePrerequisite;
