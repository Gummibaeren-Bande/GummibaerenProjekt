import IoServer from "../../types/IoServer";
import IoSocket from "../../types/IoSocket";
import TrackableTaskService from "./TrackableTaskService";

/**
 * handles trackable task related events
 *
 * @param io the static server
 * @param socket the dynamic socket dependet on the current connection
 */
function trackableTaskHandler(
  io: IoServer,
  socket: IoSocket,
  service: TrackableTaskService,
) {
  socket.on("skipTask", (taskId, groupName, callback) =>
    service.skipTask(taskId, groupName, callback),
  );
  socket.on("revertTaskSkip", (taskId, groupName, callback) =>
    service.revertTaskSkip(taskId, groupName, callback),
  );
  socket.on(
    "chooseAlternativForTask",
    (taskId, groupName, indexOfAlternative, callback) =>
      service.chooseAlternativForTask(
        taskId,
        groupName,
        indexOfAlternative,
        callback,
      ),
  );
}

export default trackableTaskHandler;
