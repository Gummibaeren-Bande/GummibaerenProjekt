import Task from "../../entities/Task";
import TaskSet from "../../entities/TaskSet";
import TaskServiceListener from "./interfaces/TaskServiceListener";

class TaskService implements TaskServiceListener {
  private readonly taskSet: TaskSet;

  constructor() {
    this.taskSet = new TaskSet();
    console.log("Task service was successfully started");
  }

  public getTaskSet(): TaskSet {
    return this.taskSet;
  }

  /**
   * uploads the given tasks to the taskSet
   * @param tasks the tasks to upload
   */
  public uploadTaskSet(tasks: Task[]) {
    this.taskSet.uploadTaskSet(tasks);
  }
}

export default TaskService;
