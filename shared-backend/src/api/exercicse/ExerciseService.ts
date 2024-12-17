import Answer from "../../types/Answer";
import CallbackExcercise from "../../types/callback-types/CallbackExcercise";
import CallbackSuccess from "../../types/callback-types/CallbackSuccess";
import TrackableTaskService from "../trackableTask/TrackableTaskService";

class ExcerciseService {
  private readonly trackableTaskService: TrackableTaskService;

  constructor(trackableTaskService: TrackableTaskService) {
    this.trackableTaskService = trackableTaskService;
    console.log("Excercise service was successfully started");
  }

  // TODO: register as Listener, handle callback, register method in handler
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
    answer: Answer,
    callback: CallbackSuccess,
  ) {
    const currentExercise = this.trackableTaskService
      .getCurrentTaskByGroupName(groupName)
      .getChosenExercise();
    const correct = currentExercise.answer(answer);
    if (correct) {
      this.trackableTaskService.handleTaskCompleted(groupName);
    }
  }

  // TODO: register as Listener, handle callback, register method in handler
  /**
   * tries to deliver the next Excercise in the callback. If the given group is finished and therefore does
   * not have a next task the callback specifies that in its message and the delivered Excercise is null
   *
   * @param groupName the group that wants its next Excercise
   * @param callback the callback that may deliver the next Excercise
   */
  public getNextExerciceOfGroup(
    groupName: string,
    callback: CallbackExcercise,
  ) {
    const hasNextTask =
      this.trackableTaskService.getHasNextTaskByGroupName(groupName);
    if (hasNextTask) {
      const nextExcercise = this.trackableTaskService
        .getNextTaskOfGroup(groupName)
        .getChosenExercise();
    }
  }
}

export default ExcerciseService;
