import Task from "./Task";
/**
 * This class represents the set of tasks in the database.
 */
class TaskSet {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  public uploadTaskSet(tasks: Task[]) {
    this.tasks = tasks;
  }

  public getTasks(): Task[] {
    return this.tasks;
  }
}

export default TaskSet;
