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
  socket.on("skipTask", (taskId, groupName) =>
    service.skipTask(taskId, groupName),
  );
  socket.on("revertTaskSkip", (taskId, groupName) =>
    service.revertTaskSkip(taskId, groupName),
  );
  socket.on(
    "chooseAlternativForTask",
    (taskId, groupName, indexOfAlternative) =>
      service.chooseAlternativForTask(taskId, groupName, indexOfAlternative),
  );
}

export default trackableTaskHandler;
