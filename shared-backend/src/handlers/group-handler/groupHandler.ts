import IoServer from "../../types/IoServer";
import IoSocket from "../../types/IoSocket";
import GroupService from "./GroupService";

const service = new GroupService();

/**
 * handles creation and rejoining of groups
 *
 * @param io the static server
 * @param socket the dynamic socket dependet on the current connection
 */
function groupHandler(io: IoServer, socket: IoSocket) {
  socket.on("addGroup", (name, callback) => service.addGroup(name, callback));
}

export default groupHandler;
