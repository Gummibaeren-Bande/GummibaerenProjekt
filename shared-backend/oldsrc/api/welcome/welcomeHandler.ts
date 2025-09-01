import IoServer from "../../types/IoServer";
import IoSocket from "../../types/IoSocket";
import WelcomeService from "./WelcomeService";

/**
 * the welcome handler handles all connection and disconnection events of clients
 *
 * @param io the static server
 * @param socket the dynamic socket dependent on the current connection
 */
function welcomeHandler(
  io: IoServer,
  socket: IoSocket,
  service: WelcomeService,
  isTeacher: boolean,
) {
  service.socketConnectionOpened(socket, isTeacher);

  socket.on("disconnect", (reason) =>
    service.socketConnectionClosed(socket, reason, isTeacher),
  );
}

export default welcomeHandler;
