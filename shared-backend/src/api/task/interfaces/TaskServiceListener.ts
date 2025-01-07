import Task from "../../../entities/Task";

interface TaskServiceListener {
  uploadTaskSet: (tasks: Task[]) => void;
}

export default TaskServiceListener;
