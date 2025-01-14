import { DisconnectReason } from "socket.io";
import IoSocket from "../../types/IoSocket";
import TeacherSocketsManager from "../../entities/TeacherSocketsManager";
import GroupSet from "../../entities/GroupSet";

/**
 * this service handles all emits to the teachers-frontends
 */
class TeacherEmitsService {

    private readonly teacherSocketsManager: TeacherSocketsManager;

  constructor() {
    this.teacherSocketsManager = new TeacherSocketsManager();
    console.log("Teacher emits service was successfully started");
  }

  public emitChangedGroupSetToAllSockets(groupSet: GroupSet) {
    this.teacherSocketsManager.emitChangedGroupSetToAllSockets(groupSet);
  }

  public addSocket(socket: IoSocket) {
    this.teacherSocketsManager.addSocket(socket);
  }

  public removeSocket(socket: IoSocket) {
    this.teacherSocketsManager.removeSocket(socket);
  }
}

export default TeacherEmitsService;
