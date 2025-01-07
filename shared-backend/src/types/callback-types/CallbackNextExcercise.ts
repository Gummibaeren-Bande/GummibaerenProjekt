import Exercise from "../../abstract-classes/Exercise";
// Definition of the callback type that is used to handle a next exercise
type CallbackNextExcercise = (message: {
  isFinished: boolean;
  nextExcercise: Exercise;
}) => void;

export default CallbackNextExcercise;
