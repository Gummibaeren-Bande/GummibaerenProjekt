import Answer from "../../../types/Answer";
import CallbackCurrentExcercise from "../../../types/callback-types/CallbackCurrentExcercise";
import CallbackNextExcercise from "../../../types/callback-types/CallbackNextExcercise";
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
    callback: CallbackCurrentExcercise,
  ) => void;
  getNextExerciceOfGroup: (
    groupName: string,
    callback: CallbackNextExcercise,
  ) => void;
}

export default ExerciseServiceListener;
