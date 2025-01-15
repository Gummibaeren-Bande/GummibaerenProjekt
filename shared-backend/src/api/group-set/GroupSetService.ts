import GroupSet from "../../entities/GroupSet";
import CallbackSuccess from "../../types/callback-types/CallbackSuccess";
import IoSocket from "../../types/IoSocket";
import TaskService from "../task/TaskService";
import TeacherEmitsService from "../teacher-emits/TeacherEmitsService";
import GroupSetServiceListeners from "./interfaces/GroupSetServiceListeners";
import CallbackGroupSet from "../../types/callback-types/CallbackGroupSet";
import EntityObserver from "./interfaces/EntityObserver";
import GroupSetDTO from "../../dtos/GroupSetDTO";

class GroupSetService implements GroupSetServiceListeners, EntityObserver {
  private readonly groupSet: GroupSet;
  private readonly taskService: TaskService;
  private readonly teachersEmitsService: TeacherEmitsService;

  constructor(
    taskService: TaskService,
    teachersEmitsService: TeacherEmitsService,
  ) {
    this.taskService = taskService;
    this.teachersEmitsService = teachersEmitsService;
    this.groupSet = new GroupSet(this);
    console.log("Group Set service was successfully started");
  }

  public getGroupSet(): GroupSet {
    return this.groupSet;
  }

  public update(): void {
    this.teachersEmitsService.emitChangedGroupSetToAllSockets(this.groupSet);
  }

  addGroup(name: string, callback: CallbackSuccess, socket?: IoSocket): void {
    if (!socket) {
      throw new Error("Socket could not be inferred!");
    }
    const successful = this.groupSet.addNewGroup(
      name,
      socket,
      this.taskService.getTaskSet(),
    );

    if (!successful) {
      callback({
        success: false,
        message: `Eine Gruppe mit dem Namen "${name}" existiert bereits. Bitte wählt einen anderen Namen`,
      });
      return;
    }
    callback({
      success: true,
      message: `Die Gruppe "${name}" wurde erfolgreich erstellt`,
    });
  }

  reconnectToGroup(
    name: string,
    callback: CallbackSuccess,
    socket?: IoSocket,
  ): void {
    if (!socket) {
      throw new Error("Socket could not be inferred!");
    }
    const group = this.getGroupSet().getGroupByName(name);
    if (!group) {
      callback({
        success: false,
        message: `Es existiert keine Gruppe mit dem Name "${name}".`,
      });
      return;
    }
    if (group.hasAssignedSocket()) {
      callback({
        success: false,
        message: `Die Gruppe "${name}" ist bereits auf einem Gerät eingeloggt. Bitte schließe zunächst das Browserfenster auf diesem Gerät.`,
      });
      return;
    }

    group.setAssignedSocket(socket);
    callback({
      success: true,
      message: `Erfolgreich als existierendes Teams "${name}" eingeloggt.`,
    });
  }

  getCurrentState(callback: CallbackGroupSet) {
    callback({ state: new GroupSetDTO(this.getGroupSet()) });
  }
}

export default GroupSetService;
