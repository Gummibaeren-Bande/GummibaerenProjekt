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
  service: ExerciseService,
) {
  socket.on(
    "answerCurrentExercise",
    (groupName, exerciseId, answer, callback) =>
      service.answerCurrentExercise(groupName, exerciseId, answer, callback),
  );
  socket.on("getCurrentExerciseOfGroup", (groupName, callback) =>
    service.getCurrentExerciseOfGroup(groupName, callback),
  );
  socket.on("getNextExerciseOfGroup", (groupName, callback) =>
    service.getNextExerciseOfGroup(groupName, callback),
  );
}

export default exerciseHandler;
