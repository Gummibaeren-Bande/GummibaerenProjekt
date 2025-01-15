import IoSocket from "../types/IoSocket";
import GroupSet from "./GroupSet";
import GroupSetDTO from "../dtos/GroupSetDTO";

/**
 * This class manages all existing teacher sockets.
 */
class TeacherSocketsManager {
  private sockets: IoSocket[];

  constructor() {
    this.sockets = [];
  }

  /**
   * adds a teacher socket to the socket list
   *
   * @param socket the given socket
   */
  public addSocket(socket: IoSocket) {
    this.sockets.push(socket);
  }

  /**
   * removes a socket from the socket list
   *
   * @param socket the given socket
   */
  public removeSocket(socket: IoSocket) {
    this.sockets = this.sockets.filter((el) => el.id !== socket.id);
  }

  public emitChangedGroupSetToAllSockets(groupSet: GroupSet) {
    this.sockets.forEach((el) =>
      el.emit("stateChanged", new GroupSetDTO(groupSet)),
    );
  }
}

export default TeacherSocketsManager;
