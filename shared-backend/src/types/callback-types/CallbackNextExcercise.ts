import ExerciseDTO from "../../dtos/ExerciseDTO";

// Definition of the callback type that is used to handle a next exercise
type CallbackNextExcercise = (message: {
  isFinished: boolean;
  nextExcercise: ExerciseDTO;
}) => void;

export default CallbackNextExcercise;
