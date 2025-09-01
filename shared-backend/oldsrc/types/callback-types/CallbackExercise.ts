import CallbackExerciseDTO from "../../dtos/CallbackDTOs/CallbackExerciseDTO";

// Definition of the callback type that is used to handle a current exercise
type CallbackExercise = (response: CallbackExerciseDTO) => void;

export default CallbackExercise;
