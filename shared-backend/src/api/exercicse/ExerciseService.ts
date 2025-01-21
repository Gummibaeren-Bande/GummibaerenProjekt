import CallbackExerciseDTO from "../../dtos/CallbackDTOs/CallbackExerciseDTO";
import CallbackSuccessDTO from "../../dtos/CallbackDTOs/CallbackSuccessDTO";
import ExerciseDTO from "../../dtos/ExerciseDTO";
import Answer from "../../types/Answer";
import CallbackExercise from "../../types/callback-types/CallbackExercise";
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
   * try to answer the current exercise of the given group with the given answer
   * if, the answer is correct, the corresponding TrackableTask is marked as completed.
   * Getting the next question is a seperate action.
   *
   * @param groupName the name of the answering group
   * @param answer the answer given by the group
   * @param callback a callback that will provide information if the answer was correct
   */
  public answerCurrentExcercise(
    groupName: string,
    exerciseId: string,
    answer: Answer,
    callback: CallbackSuccess
  ) {
    const currentTask =
      this.trackableTaskService.getCurrentTaskByGroupName(groupName);
    if (!currentTask) {
      callback(
        new CallbackSuccessDTO(false, "Keine aktuelle Aufgabe gefunden")
      );
      return;
    }
    const currentExercise = currentTask.getChosenExercise();
    if (currentExercise.id !== exerciseId) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Die gegebene ID stimmt nicht mit der ID der aktuellen Aufgabe überein"
        )
      );
      return;
    }
    try {
      const correct = currentExercise.answer(answer);
      if (correct) {
        this.trackableTaskService.handleTaskCompleted(groupName);
        callback(new CallbackSuccessDTO(true, "Die Antwort war richtig"));
      }
      callback(new CallbackSuccessDTO(false, "Die Antwort war falsch"));
    } catch (error) {
      if (error instanceof Error) {
        callback(new CallbackSuccessDTO(false, error.message));
      } else {
        callback(
          new CallbackSuccessDTO(
            false,
            "Ein unbekannter Fehler ist aufgetreten"
          )
        );
      }
    }
  }

  /**
   * delivers the current Excercise in the callback. Throws an error if the group has no current exercise.
   *
   * @param groupName the group that wants its current Excercise
   * @param callback the callback that delivers the current Excercise
   */
  public getCurrentExcerciceOfGroup(
    groupName: string,
    callback: CallbackExercise
  ) {
    const currentTask =
      this.trackableTaskService.getCurrentTaskByGroupName(groupName);
    if (!currentTask) {
      callback(
        new CallbackExerciseDTO(
          false,
          "Keine aktuelle Aufgabe gefunden",
          false,
          null
        )
      );
      return;
    }
    const currentExcercise = new ExerciseDTO(currentTask.getChosenExercise());
    if (currentExcercise) {
      callback(new CallbackExerciseDTO(true, "", false, currentExcercise));
    } else {
      callback(
        new CallbackExerciseDTO(
          false,
          "Keine aktuelle Aufgabe gefunden",
          false,
          null
        )
      );
    }
  }

  /**
   * tries to deliver the next Excercise in the callback. If the given group is finished and therefore does
   * not have a next task the callback specifies that in its message and the delivered Excercise is null
   *
   * @param groupName the group that wants its next Excercise
   * @param callback the callback that may deliver the next Excercise
   */
  public getNextExerciceOfGroup(groupName: string, callback: CallbackExercise) {
    const hasNextTask =
      this.trackableTaskService.getHasNextTaskByGroupName(groupName);
    if (hasNextTask) {
      try {
        const nextExcercise = new ExerciseDTO(
          this.trackableTaskService
            .getNextTaskOfGroup(groupName)
            .getChosenExercise()
        );
        callback(new CallbackExerciseDTO(true, "", false, nextExcercise));
      } catch (error) {
        if (error instanceof Error) {
          callback(new CallbackExerciseDTO(false, error.message, false, null));
        } else {
          callback(
            new CallbackExerciseDTO(
              false,
              "Ein unbekannter Fehler ist aufgetreten",
              false,
              null
            )
          );
        }
      }
    } else {
      callback(
        new CallbackExerciseDTO(
          false,
          "Keine nächste Aufgabe gefunden",
          false,
          null
        )
      );
    }
  }
}

export default ExcerciseService;
