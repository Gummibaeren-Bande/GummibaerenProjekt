import Exercise from "../../abstract-classes/Exercise";

type CallbackExcercise = (message: {
  isFinished: boolean;
  nextExcercise: Exercise;
}) => void;

export default CallbackExcercise;
