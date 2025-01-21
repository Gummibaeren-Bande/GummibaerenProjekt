import { DisconnectReason } from "socket.io";
import IoSocket from "../../types/IoSocket";
import GroupService from "../group/GroupService";
import TeacherEmitsService from "../teacher-emits/TeacherEmitsService";

/**
 * this service handles socket connections and disconnection
 */
class WelcomeService {
  private readonly groupService: GroupService;
  private readonly teacherEmitsService: TeacherEmitsService;

  constructor(
    groupService: GroupService,
    teacherEmitsService: TeacherEmitsService,
  ) {
    this.groupService = groupService;
    this.teacherEmitsService = teacherEmitsService;
    console.log("Welcome service was successfully started");
  }

  /**
   * handles client connections to the socket
   */
  socketConnectionOpened(socket: IoSocket, isTeacher: boolean) {
    const entity: string = isTeacher ? "teacher" : "student";
    console.log(`${entity} connected to socket ${socket.id}`);
    if (isTeacher) {
      this.teacherEmitsService.addSocket(socket);
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
      this.teacherEmitsService.removeSocket(socket);
    } else {
      this.groupService.deassignSocketFromGroup(socket);
    }
  }
}

export default WelcomeService;
