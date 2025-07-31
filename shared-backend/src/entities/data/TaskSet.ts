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
}

export default TaskSet;
