import ExerciseDTO from "../ExerciseDTO";
import CallbackSuccessDTO from "./CallbackSuccessDTO";

class CallbackExerciseDTO extends CallbackSuccessDTO {
  readonly isFinished: boolean;
  readonly exercise: ExerciseDTO;
  constructor(
    success: boolean,
    message: string,
    isFinished: boolean,
    exercise: ExerciseDTO,
  ) {
    super(success, message);
    this.isFinished = isFinished;
    this.exercise = exercise;
  }
}

export default CallbackExerciseDTO;
