import IoServer from "../../types/IoServer";
import IoSocket from "../../types/IoSocket";
import GroupSetService from "./GroupSetService";

/**
 * handles creation and rejoining of groups
 *
 * @param io the static server
 * @param socket the dynamic socket dependet on the current connection
 */
function groupSetHandler(
  io: IoServer,
  socket: IoSocket,
  service: GroupSetService,
) {
  socket.on("addGroup", (name, callback) =>
    service.addGroup(name, callback, socket),
  );
  socket.on("reconnectToGroup", (name, callback) =>
    service.reconnectToGroup(name, callback, socket),
  );
  socket.on("requestCurrentState", (callback) =>
    service.requestCurrentState(callback),
  );
}

export default groupSetHandler;
