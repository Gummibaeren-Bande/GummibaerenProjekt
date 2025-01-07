import Answer from "../../../types/Answer";
import CallbackExcercise from "../../../types/callback-types/CallbackExcercise";
import CallbackSuccess from "../../../types/callback-types/CallbackSuccess";

interface ExerciseServiceListener {
  answerCurrentExcercise: (
    groupName: string,
    excerciseId: string,
    answer: Answer,
    callback: CallbackSuccess,
  ) => void;
  getCurrentExcerciceOfGroup: (
    groupName: string,
    callback: CallbackExcercise,
  ) => void;
  getNextExerciceOfGroup: (
    groupName: string,
    callback: CallbackExcercise,
  ) => void;
}

export default ExerciseServiceListener;
