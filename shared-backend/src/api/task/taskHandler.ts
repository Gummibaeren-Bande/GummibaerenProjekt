import IoServer from "../../types/IoServer";
import IoSocket from "../../types/IoSocket";
import TaskService from "./TaskService";

/**
 * handles task related events
 *
 * @param io the static server
 * @param socket the dynamic socket dependet on the current connection
 */
function taskHandler(io: IoServer, socket: IoSocket, service: TaskService) {
  socket.on("uploadTaskSet", (tasks) => service.uploadTaskSet(tasks));
}

export default taskHandler;
