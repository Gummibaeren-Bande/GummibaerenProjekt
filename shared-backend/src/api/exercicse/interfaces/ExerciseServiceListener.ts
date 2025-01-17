import Answer from "../../../types/Answer";
import CallbackExercise from "../../../types/callback-types/CallbackExercise";
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
    callback: CallbackExercise,
  ) => void;
  getNextExerciceOfGroup: (
    groupName: string,
    callback: CallbackExercise,
  ) => void;
}

export default ExerciseServiceListener;
