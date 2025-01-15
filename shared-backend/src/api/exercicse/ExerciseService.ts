import ExerciseDTO from "../../dtos/ExerciseDTO";
import Answer from "../../types/Answer";
import CallbackCurrentExcercise from "../../types/callback-types/CallbackCurrentExcercise";
import CallbackNextExcercise from "../../types/callback-types/CallbackNextExcercise";
import CallbackSuccess from "../../types/callback-types/CallbackSuccess";
import TrackableTaskService from "../trackableTask/TrackableTaskService";
import ExerciseServiceListener from "./interfaces/ExerciseServiceListener";

class ExcerciseService implements ExerciseServiceListener {
  private readonly trackableTaskService: TrackableTaskService;

  constructor(trackableTaskService: TrackableTaskService) {
    this.trackableTaskService = trackableTaskService;
    console.log("Excercise service was successfully started");
  }

  /**
   * try to answer the current excercise of the given group with the given answer
   * if, the answer is correct, the corresponding TrackableTask is marked as completed.
   * Getting the next question is a seperate action.
   *
   * @param groupName the name of the answering group
   * @param answer the answer given by the group
   * @param callback a callback that will provide information if the answer was correct
   */
  public answerCurrentExcercise(
    groupName: string,
    excerciseId: string,
    answer: Answer,
    callback: CallbackSuccess,
  ) {
    const currentTask =
      this.trackableTaskService.getCurrentTaskByGroupName(groupName);
    if (!currentTask) {
      throw new Error("current task not found for the given group!");
    }
    const currentExercise = currentTask.getChosenExercise();
    if (currentExercise.id !== excerciseId) {
      callback({
        success: false,
        message:
          "Die gegebene ID stimmt nicht mit der ID der aktuellen Aufgabe überein",
      });
      return;
    }
    const correct = currentExercise.answer(answer);
    if (correct) {
      this.trackableTaskService.handleTaskCompleted(groupName);
    }
  }

  /**
   * delivers the current Excercise in the callback. Throws an error if the group has no current excercise.
   *
   * @param groupName the group that wants its current Excercise
   * @param callback the callback that delivers the current Excercise
   */
  public getCurrentExcerciceOfGroup(
    groupName: string,
    callback: CallbackCurrentExcercise,
  ) {
    const currentTask =
      this.trackableTaskService.getCurrentTaskByGroupName(groupName);

    if (!currentTask) {
      throw new Error("current task of given group not found!");
    }
    const currentExcercise = new ExerciseDTO(currentTask.getChosenExercise());
    if (currentExcercise) {
      callback({
        isFinished: false,
        currentExcercise: currentExcercise,
      });
    } else {
      throw new Error("No current excercise found for the given group");
    }
  }

  /**
   * tries to deliver the next Excercise in the callback. If the given group is finished and therefore does
   * not have a next task the callback specifies that in its message and the delivered Excercise is null
   *
   * @param groupName the group that wants its next Excercise
   * @param callback the callback that may deliver the next Excercise
   */
  public getNextExerciceOfGroup(
    groupName: string,
    callback: CallbackNextExcercise,
  ) {
    const hasNextTask =
      this.trackableTaskService.getHasNextTaskByGroupName(groupName);
    if (hasNextTask) {
      const nextExcercise = new ExerciseDTO(
        this.trackableTaskService
          .getNextTaskOfGroup(groupName)
          .getChosenExercise(),
      );
      callback({ isFinished: false, nextExcercise });
    } else {
      throw new Error("No next excercise found for the given group");
    }
  }
}

export default ExcerciseService;
