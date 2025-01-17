import ExerciseDTO from "../../dtos/ExerciseDTO";

// Definition of the callback type that is used to handle a current exercise
type CallbackCurrentExcercise = (message: {
  isFinished: boolean;
  currentExcercise: ExerciseDTO;
}) => void;

export default CallbackCurrentExcercise;
