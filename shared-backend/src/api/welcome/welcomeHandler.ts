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
function welcomeHandler(io: IoServer, socket: IoSocket, isTeacher: boolean) {
  service.socketConnectionOpened(socket, isTeacher);

  socket.on("disconnect", (reason) => service.socketConnectionClosed(socket, reason, isTeacher));
}

export default welcomeHandler;
