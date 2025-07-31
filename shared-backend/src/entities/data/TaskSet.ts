import TrackableTaskState from "../../enums/TrackableTaskState";
import Task from "./Task";
/**
 * This class represents the set of tasks in the database.
 */
class TaskSet {
  private readonly name: string;
  private tasks: Task[];

  constructor(name: string) {
    this.name = name;
    this.tasks = [];
  }

  public uploadTaskSet(tasks: Task[]) {
    this.tasks = tasks;
  }

  public getTasks(): Task[] {
    return this.tasks;
  }

  public getName(): string {
    return this.name;
  }

  public addPrerequisites(prerequisiteList: string[]): void {
    for (const element of prerequisiteList) {
      const [taskIndexStr, prerequisiteIndexStr, equals, state] =
        element.split(",");
      const taskIndex = Number(taskIndexStr);
      const prerequisiteIndex = Number(prerequisiteIndexStr);
      if (
        isNaN(taskIndex) ||
        isNaN(prerequisiteIndex) ||
        taskIndex < 0 ||
        prerequisiteIndex < 0 ||
        taskIndex >= this.tasks.length ||
        prerequisiteIndex >= this.tasks.length
      ) {
        throw new Error(`Invalid task or prerequisite index: ${element}`);
      }
      const task = this.tasks[taskIndex];
      const prerequisite = this.tasks[prerequisiteIndex];
      const equalsBool = equals === "true";
      if (task && prerequisite) {
        task.addPrerequisite(
          prerequisite,
          equalsBool,
          state as TrackableTaskState
        );
      }
    }
  }
}

export default TaskSet;
