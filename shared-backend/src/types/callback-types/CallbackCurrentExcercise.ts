import Exercise from "../../abstract-classes/Exercise";
// Definition of the callback type that is used to handle a current exercise
type CallbackCurrentExcercise = (message: {
  isFinished: boolean;
  currentExcercise: Exercise;
}) => void;

export default CallbackCurrentExcercise;
