import Task from "../entities/Task";
import ExerciseDTO from "./ExerciseDTO";

// a dto to transfer a task
class TaskDTO {
  public readonly id: string;
  public readonly name: string;
  public readonly exercises: ExerciseDTO[];

  constructor(task: Task) {
    this.id = task.getId();
    this.name = task.getName();
    this.exercises = task.getExercises().map((ex) => new ExerciseDTO(ex));
  }
}

export default TaskDTO;
