import Answer from "../../../types/Answer";
import CallbackExercise from "../../../types/callback-types/CallbackExercise";
import CallbackSuccess from "../../../types/callback-types/CallbackSuccess";

interface ExerciseServiceListener {
  /**
   * try to answer the current exercise of the given group with the given answer
   * if, the answer is correct, the corresponding TrackableTask is marked as completed.
   * Getting the next question is a separate action.
   *
   * @param groupName the name of the answering group
   * @param answer the answer given by the group
   * @param callback a callback that will provide information if the answer was correct
   */
  answerCurrentExercise: (
    groupName: string,
    exerciseId: string,
    answer: Answer,
    callback: CallbackSuccess,
  ) => void;
  /**
   * delivers the current Exercise in the callback. Throws an error if the group has no current exercise.
   *
   * @param groupName the group that wants its current Exercise
   * @param callback the callback that delivers the current Exercise
   */
  getCurrentExerciseOfGroup: (
    groupName: string,
    callback: CallbackExercise,
  ) => void;
  /**
   * tries to deliver the next Exercise in the callback. If the given group is finished and therefore does
   * not have a next task the callback specifies that in its message and the delivered Exercise is null
   *
   * @param groupName the group that wants its next Exercise
   * @param callback the callback that may deliver the next Exercise
   */
  getNextExerciseOfGroup: (
    groupName: string,
    callback: CallbackExercise,
  ) => void;
}

export default ExerciseServiceListener;
