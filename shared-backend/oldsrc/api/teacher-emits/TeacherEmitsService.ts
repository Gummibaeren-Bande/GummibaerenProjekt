import IoSocket from "../../types/IoSocket";
import TeacherSocketsManager from "../../entities/TeacherSocketsManager";
import GroupSet from "../../entities/GroupSet";
import TaskSet from "../../entities/TaskSet";

/**
 * this service handles all emits to the teachers-frontends
 */
class TeacherEmitsService {
  private readonly teacherSocketsManager: TeacherSocketsManager;

  constructor() {
    this.teacherSocketsManager = new TeacherSocketsManager();
    console.log("Teacher emits service was successfully started");
  }

  /**
   * emit the changed group set to all registered teacher sockets
   * @param groupSet the changed group set to emit
   */
  public emitChangedGroupSetToAllSockets(groupSet: GroupSet, taskSet: TaskSet) {
    this.teacherSocketsManager.emitChangedGroupSetToAllSockets(
      groupSet,
      taskSet,
    );
  }

  /**
   * adds a new teacher socket
   * @param socket the new socket
   */
  public addSocket(socket: IoSocket) {
    this.teacherSocketsManager.addSocket(socket);
  }

  /**
   * remove a socket from the socket list if present
   * @param socket
   */
  public removeSocket(socket: IoSocket) {
    this.teacherSocketsManager.removeSocket(socket);
  }
}

export default TeacherEmitsService;
