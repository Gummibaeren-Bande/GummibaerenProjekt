import Exercise from "../../abstract-classes/Exercise";
// Definition of the callback type that is used to handle an exercise
type CallbackExcercise = (message: {
  isFinished: boolean;
  nextExcercise: Exercise;
}) => void;

export default CallbackExcercise;
