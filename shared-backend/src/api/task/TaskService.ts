import Task from "../../entities/Task";
import TaskSet from "../../entities/TaskSet";

class TaskService {
  private readonly taskSet: TaskSet;

  constructor() {
    this.taskSet = new TaskSet();
    console.log("Task service was successfully started");
  }

  public getTaskSet(): TaskSet {
    return this.taskSet;
  }

  // TODO: register as Listener, register method in handler
  public uploadTaskSet(tasks: Task[]) {
    this.taskSet.uploadTaskSet(tasks);
  }
}

export default TaskService;
