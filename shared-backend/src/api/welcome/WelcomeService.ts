import { DisconnectReason } from "socket.io";
import IoSocket from "../../types/IoSocket";

/**
 * this service handles socket connections and disconnection
 */
class WelcomeService {
  /**
   * handles client connections to the socket
   */
  socketConnectionOpened(socket: IoSocket) {
    console.log(`client connected to socket ${socket.id}`);
  }

  /**
   * handles client disconnections to the socket
   */
  socketConnectionClosed(reason: DisconnectReason) {
    console.log(`client disconnected due to ${reason}`);
  }
}

export default WelcomeService;
