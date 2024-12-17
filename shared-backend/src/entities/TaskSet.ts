import Task from "./Task";

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
