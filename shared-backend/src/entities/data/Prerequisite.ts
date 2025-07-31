import TrackableTaskState from "../../enums/TrackableTaskState";
import Task from "./Task";

class Prerequisite {
  private readonly task: Task;
  private readonly equals: boolean;
  private readonly state: TrackableTaskState;

  constructor(task: Task, equals: boolean, state: TrackableTaskState) {
    this.task = task;
    this.equals = equals;
    this.state = state;
  }

  public getTask(): Task {
    return this.task;
  }

  public isEquals(): boolean {
    return this.equals;
  }
  public getState(): TrackableTaskState {
    return this.state;
  }
}
export default Prerequisite;
