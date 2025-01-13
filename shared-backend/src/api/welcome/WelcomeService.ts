import { DisconnectReason } from "socket.io";
import IoSocket from "../../types/IoSocket";

/**
 * this service handles socket connections and disconnection
 */
class WelcomeService {
  /**
   * handles client connections to the socket
   */
  socketConnectionOpened(socket: IoSocket, isTeacher: boolean) {
    const entity: string = isTeacher? "teacher" : "student"
    console.log(`${entity} connected to socket ${socket.id}`);
  }

  /**
   * handles client disconnections to the socket
   */
  socketConnectionClosed(socket: IoSocket, reason: DisconnectReason, isTeacher: boolean) {
    const entity: string = isTeacher? "teacher" : "student"
    console.log(`${entity} socket ${socket.id} was terminated due to ${reason}`);
  }
}

export default WelcomeService;
