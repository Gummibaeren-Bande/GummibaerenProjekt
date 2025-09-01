import ExerciseDTO from "../ExerciseDTO";
import CallbackSuccessDTO from "./CallbackSuccessDTO";

// a data transferable object used for CallbackExercise
class CallbackExerciseDTO extends CallbackSuccessDTO {
  readonly isFinished: boolean;
  readonly exercise: ExerciseDTO | null;
  constructor(
    success: boolean,
    message: string,
    isFinished: boolean,
    exercise: ExerciseDTO | null,
  ) {
    super(success, message);
    this.isFinished = isFinished;
    this.exercise = exercise;
  }
}

export default CallbackExerciseDTO;
