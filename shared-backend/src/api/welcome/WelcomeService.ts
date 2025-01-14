import { DisconnectReason } from "socket.io";
import IoSocket from "../../types/IoSocket";
import GroupService from "../group/GroupService";
import TeacherSocketsManager from "../../entities/TeacherSocketsManager";

/**
 * this service handles socket connections and disconnection
 */
class WelcomeService {
  private readonly groupService: GroupService;
  private readonly teacherSocketsManager: TeacherSocketsManager;

  constructor(groupService: GroupService) {
    this.groupService = groupService;
    this.teacherSocketsManager = new TeacherSocketsManager();
    console.log("Welcome service was successfully started");
  }

  /**
   * handles client connections to the socket
   */
  socketConnectionOpened(socket: IoSocket, isTeacher: boolean) {
    const entity: string = isTeacher ? "teacher" : "student";
    console.log(`${entity} connected to socket ${socket.id}`);

    if (isTeacher) {
      this.teacherSocketsManager.addSocket(socket);
    }
  }

  /**
   * handles client disconnections to the socket
   */
  socketConnectionClosed(
    socket: IoSocket,
    reason: DisconnectReason,
    isTeacher: boolean,
  ) {
    const entity: string = isTeacher ? "teacher" : "student";
    console.log(
      `${entity} socket ${socket.id} was terminated due to ${reason}`,
    );

    if (isTeacher) {
      this.teacherSocketsManager.removeSocket(socket);
    } else {
      this.groupService.deassignSocketFromGroup(socket);
    }
  }
}

export default WelcomeService;
