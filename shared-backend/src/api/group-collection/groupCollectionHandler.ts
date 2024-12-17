import IoServer from "../../types/IoServer";
import IoSocket from "../../types/IoSocket";
import GroupCollectionService from "./GroupCollectionService";

/**
 * handles creation and rejoining of groups
 *
 * @param io the static server
 * @param socket the dynamic socket dependet on the current connection
 */
function groupCollectionHandler(
  io: IoServer,
  socket: IoSocket,
  service: GroupCollectionService,
) {
  socket.on("addGroup", (name, callback) => service.addGroup(name, callback));
}

export default groupCollectionHandler;
