import IoServer from "../../types/IoServer";
import IoSocket from "../../types/IoSocket";
import WelcomeService from "./WelcomeService";

const service = new WelcomeService();

/**
 * the welcome handler handles all connection and disconnection events of clients
 *
 * @param io the static server
 * @param socket the dynamic socket dependet on the current connection
 */
function welcomeHandler(io: IoServer, socket: IoSocket) {
  service.socketConnectionOpened(socket);

  socket.on("disconnect", (reason) => service.socketConnectionClosed(reason));
}

export default welcomeHandler;
