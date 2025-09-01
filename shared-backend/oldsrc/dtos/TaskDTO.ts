import Task from "../entities/Task";
import ExerciseDTO from "./ExerciseDTO";

// a data transferable object to transfer a task
class TaskDTO {
  public readonly id: string;
  public readonly name: string;
  public readonly numberOfAlternatives: number;
  public readonly exercises: ExerciseDTO[];

  constructor(task: Task) {
    this.id = task.getId();
    this.name = task.getName();
    this.numberOfAlternatives = task.getExercises().length - 1;
    this.exercises = [];
    for (const [index, exercise] of task.getExercises().entries()) {
      this.exercises.push(
        new ExerciseDTO(exercise, String.fromCharCode(65 + index)),
      );
    }
  }
}

export default TaskDTO;
