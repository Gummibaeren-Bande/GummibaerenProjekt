import TrackableTaskState from "../../enums/TrackableTaskState";
import Prerequisite from "./Prerequisite";
import Task from "./Task";
/**
 * This class represents the set of tasks in the database.
 */
class TaskSet {
  private readonly name: string;
  private readonly tasks: Task[];
  private readonly prerequisites: Prerequisite[];
  constructor(name: string, tasks: Task[], prerequisites: string[]) {
    this.name = name;
    this.tasks = tasks;
    this.prerequisites = this.parsePrerequisites(prerequisites);
    if (this.tasks.length === 0) {
      throw new Error("TaskSet must contain at least one task.");
    }
  }

  public getTasks(): Task[] {
    return this.tasks;
  }

  public getName(): string {
    return this.name;
  }

  private verifyPrerequisite(prerequisite: string[]) {
    if (prerequisite.length !== 4) {
      throw new Error(
        `Invalid prerequisite format: ${prerequisite.join(", ")}`
      );
    }
    const [taskIndexStr, prerequisiteIndexStr, equals, state] = prerequisite;
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
      throw new Error(
        `Invalid task or prerequisite index: ${taskIndex}, ${prerequisiteIndex}`
      );
    }
    if (equals !== "true" && equals !== "false") {
      throw new Error(`Invalid equals value: ${equals}`);
    }
    if (
      !Object.values(TrackableTaskState).includes(state as TrackableTaskState)
    ) {
      throw new Error(`Invalid state: ${state}`);
    }
  }
  private parsePrerequisites(prerequisiteList: string[]): Prerequisite[] {
    let parsedList: Prerequisite[] = [];
    for (const element of prerequisiteList) {
      const [taskIndexStr, prerequisiteIndexStr, equals, state] =
        element.split(",");
      const taskIndex = Number(taskIndexStr);
      const prerequisiteIndex = Number(prerequisiteIndexStr);
      try {
        this.verifyPrerequisite([
          taskIndexStr,
          prerequisiteIndexStr,
          equals,
          state
        ]);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error verifying prerequisite: ${error.message}`);
        } else {
          console.error(`Error verifying prerequisite: ${String(error)}`);
        }
        continue; // Skip this prerequisite if verification fails
      }
      const task = this.tasks[taskIndex];
      const prerequisite = this.tasks[prerequisiteIndex];
      const equalsBool = equals === "true";
      if (task && prerequisite) {
        parsedList.push(
          new Prerequisite(
            task,
            prerequisite,
            equalsBool,
            state as TrackableTaskState
          )
        );
      }
    }
    return parsedList;
  }

  public getPrerequisites(): Prerequisite[] {
    return this.prerequisites;
  }
}

export default TaskSet;
