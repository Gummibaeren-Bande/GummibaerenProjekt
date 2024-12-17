import Exercise from "../../interfaces/Exercise";

type CallbackExcercise = (message: {
  isFinished: boolean;
  nextExcercise: Exercise;
}) => void;

export default CallbackExcercise;
