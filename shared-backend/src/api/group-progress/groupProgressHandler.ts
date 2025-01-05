import IoServer from "../../types/IoServer";
import IoSocket from "../../types/IoSocket";
import GroupProgressService from "./GroupProgressService";

/**
 * handles group progress related events
 *
 * @param io the static server
 * @param socket the dynamic socket dependet on the current connection
 */
function groupProgressHandler(
  io: IoServer,
  socket: IoSocket,
  service: GroupProgressService
) {
  socket.on("finishWork", (groupName, callback) =>
    service.finishWork(groupName, callback)
  );
  socket.on("getNumberOfFinishedTasks", (groupName, callback) =>
    service.getNumberOfFinishedTasks(groupName, callback)
  );
}

export default groupProgressHandler;
