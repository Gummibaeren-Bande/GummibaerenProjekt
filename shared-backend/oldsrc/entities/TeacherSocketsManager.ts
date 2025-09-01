import IoSocket from "../types/IoSocket";
import GroupSet from "./GroupSet";
import CurrentStateDTO from "../dtos/CurrentStateDTO";
import TaskSet from "./TaskSet";

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

  /**
   * Sends the group set to all stored sockets, used for updating the teachers view
   *
   * @param groupSet the group set to be sent to all sockets
   * @param taskSet the task set to be sent to all sockets
   */
  public emitChangedGroupSetToAllSockets(groupSet: GroupSet, taskSet: TaskSet) {
    this.sockets.forEach((el) =>
      el.emit("stateChanged", new CurrentStateDTO(groupSet, taskSet)),
    );
  }
}

export default TeacherSocketsManager;
