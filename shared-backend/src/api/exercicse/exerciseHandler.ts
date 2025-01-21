import IoServer from "../../types/IoServer";
import IoSocket from "../../types/IoSocket";
import ExerciseService from "./ExerciseService";

/**
 * handles exercise related events
 *
 * @param io the static server
 * @param socket the dynamic socket dependet on the current connection
 */
function exerciseHandler(
  io: IoServer,
  socket: IoSocket,
  service: ExerciseService
) {
  socket.on(
    "answerCurrentExcercise",
    (groupName, exerciseId, answer, callback) =>
      service.answerCurrentExcercise(groupName, exerciseId, answer, callback)
  );
  socket.on("getCurrentExcerciceOfGroup", (groupName, callback) =>
    service.getCurrentExcerciceOfGroup(groupName, callback)
  );
  socket.on("getNextExerciceOfGroup", (groupName, callback) =>
    service.getNextExerciceOfGroup(groupName, callback)
  );
}

export default exerciseHandler;
