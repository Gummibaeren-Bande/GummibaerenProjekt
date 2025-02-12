import Task from "../../../entities/Task";

interface TaskServiceListener {
  /**
   * Sets the task set to the given array of tasks.
   *
   * @param tasks the task array to be uploaded
   */
  uploadTaskSet: (tasks: Task[]) => void;
}

export default TaskServiceListener;
