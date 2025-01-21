import GroupSet from "../../entities/GroupSet";
import CallbackSuccess from "../../types/callback-types/CallbackSuccess";
import IoSocket from "../../types/IoSocket";
import TaskService from "../task/TaskService";
import TeacherEmitsService from "../teacher-emits/TeacherEmitsService";
import GroupSetServiceListeners from "./interfaces/GroupSetServiceListeners";
import CallbackGroupSet from "../../types/callback-types/CallbackGroupSet";
import EntityObserver from "./interfaces/EntityObserver";
import GroupSetDTO from "../../dtos/GroupSetDTO";
import CallbackGroupSetDTO from "../../dtos/CallbackDTOs/CallbackGroupSetDTO";
import CallbackSuccessDTO from "../../dtos/CallbackDTOs/CallbackSuccessDTO";

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
      callback(
        new CallbackSuccessDTO(
          false,
          `Eine Gruppe mit dem Namen "${name}" existiert bereits. Bitte wählt einen anderen Namen`,
        ),
      );
      return;
    }
    callback(
      new CallbackSuccessDTO(
        true,
        `Die Gruppe "${name}" wurde erfolgreich erstellt`,
      ),
    );
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
      callback(
        new CallbackSuccessDTO(false, `Die Gruppe "${name}" existiert nicht.`),
      );
      return;
    }
    if (group.hasAssignedSocket()) {
      callback(
        new CallbackSuccessDTO(
          false,
          `Die Gruppe "${name}" ist bereits auf einem Gerät eingeloggt. Bitte schließe zunächst das Browserfenster auf diesem Gerät.`,
        ),
      );
      return;
    }

    group.setAssignedSocket(socket);
    callback(
      new CallbackSuccessDTO(
        true,
        `Erfolgreich als existierendes Teams "${name}" eingeloggt.`,
      ),
    );
  }

  getCurrentState(callback: CallbackGroupSet) {
    callback(new CallbackGroupSetDTO(true, "", new GroupSetDTO(this.groupSet)));
  }
}

export default GroupSetService;
