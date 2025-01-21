import ExerciseService from "../api/exercicse/ExerciseService";
import GroupProgressService from "../api/group-progress/GroupProgressService";
import GroupService from "../api/group/GroupService";
import GroupSetService from "../api/group-set/GroupSetService";
import TaskService from "../api/task/TaskService";
import TeacherEmitsService from "../api/teacher-emits/TeacherEmitsService";
import TrackableTaskService from "../api/trackableTask/TrackableTaskService";
import WelcomeService from "../api/welcome/WelcomeService";
import CallbackSuccessDTO from "../dtos/CallbackDTOs/CallbackSuccessDTO";
import taskList from "../taskList";
import IoSocket from "../types/IoSocket";
import GroupSetDTO from "../dtos/GroupSetDTO";
import GroupSet from "../entities/GroupSet";
import CallbackNumberDTO from "../dtos/CallbackDTOs/CallbackNumberDTO";

const TEST_ID = "abcd12345";
const TEST_ID_2 = "efgh67890";
const SOCKET_1 = { id: TEST_ID, emit: jest.fn() } as unknown as IoSocket;
const SOCKET_2 = { id: TEST_ID_2, emit: jest.fn() } as unknown as IoSocket;

describe("TaskService", () => {
  const taskService = new TaskService();
  it("should return a taskSet", () => {
    taskService.uploadTaskSet(taskList);
    expect(taskService.getTaskSet()).toBeDefined();
  });
});

describe("TeacherEmitsService", () => {
  const teacherEmitsService = new TeacherEmitsService();

  it("should add a socket", () => {
    teacherEmitsService.addSocket(SOCKET_1);
    // @ts-ignore
    expect(teacherEmitsService.teacherSocketsManager.sockets).toContain(
      SOCKET_1
    );
  });
  it("should remove a socket", () => {
    teacherEmitsService.removeSocket(SOCKET_1);
    // @ts-ignore
    expect(teacherEmitsService.teacherSocketsManager.sockets).not.toContain(
      SOCKET_1
    );
    // @ts-ignore
    expect(teacherEmitsService.teacherSocketsManager.sockets).not.toContain(
      SOCKET_2
    );
  });
  it("should emit a changed group set to all sockets", () => {
    const groupSet = new GroupSet(
      new GroupSetService(new TaskService(), teacherEmitsService)
    );
    const emitSpy = jest.spyOn(SOCKET_1, "emit");
    teacherEmitsService.addSocket(SOCKET_1);
    teacherEmitsService.emitChangedGroupSetToAllSockets(groupSet);
    expect(emitSpy).toHaveBeenCalled();
  });
});

const groupIdentifier = "group1";
describe("GroupServices", () => {
  const taskService = new TaskService();
  const teacherEmitsService = new TeacherEmitsService();
  const groupSetService = new GroupSetService(taskService, teacherEmitsService);
  taskService.uploadTaskSet(taskList);
  const groupService = new GroupService(groupSetService);
  const groupSet = groupSetService.getGroupSet();
  const groupProgressService = new GroupProgressService(groupService);

  it("should return a groupSet", () => {
    expect(groupSet).toBeDefined();
  });
  it("should add a group", () => {
    const callback = jest.fn();
    groupSetService.addGroup(groupIdentifier, callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(false, "Socket could not be inferred!")
    );
    groupSetService.addGroup(groupIdentifier, callback, SOCKET_1);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        true,
        `Die Gruppe "group1" wurde erfolgreich erstellt`
      )
    );
    groupSetService.addGroup(groupIdentifier, callback, SOCKET_1);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        `Eine Gruppe mit dem Namen "group1" existiert bereits. Bitte wählt einen anderen Namen`
      )
    );
  });
  it("should reconnect to a group", () => {
    groupService.deassignSocketFromGroup(SOCKET_1);
    const callback = jest.fn();
    groupSetService.reconnectToGroup(groupIdentifier, callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(false, "Socket could not be inferred!")
    );
    groupSetService.reconnectToGroup("groupIdentifier", callback, SOCKET_2);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        `Die Gruppe "groupIdentifier" existiert nicht.`
      )
    );
    groupSetService.reconnectToGroup(groupIdentifier, callback, SOCKET_2);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        true,
        `Erfolgreich als existierendes Teams "group1" eingeloggt.`
      )
    );
    groupSetService.reconnectToGroup(groupIdentifier, callback, SOCKET_1);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        `Die Gruppe "group1" ist bereits auf einem Gerät eingeloggt. Bitte schließe zunächst das Browserfenster auf diesem Gerät.`
      )
    );
  });
  it("should return a group by name", () => {
    const group = groupService.getGroupByName(groupIdentifier);
    expect(group).toBeDefined();
  });
  describe("GroupProgressService", () => {
    it("should have trouble finishing work", () => {
      let callback = jest.fn();
      groupProgressService.finishWork(groupIdentifier, callback);
      expect(callback).toHaveBeenCalledWith(
        new CallbackSuccessDTO(false, "Es gibt noch Aufgaben zu erledigen")
      );
      callback = jest.fn();
      groupProgressService.finishWork("groupIdentifier", callback);
      expect(callback).toHaveBeenCalledWith(
        new CallbackSuccessDTO(false, "Group progress nicht gefunden")
      );
    });
    it("should get number of finished tasks", () => {
      let callback = jest.fn();
      groupProgressService.getNumberOfFinishedTasks(groupIdentifier, callback);
      expect(callback).toHaveBeenCalledWith(new CallbackNumberDTO(true, "", 0));
      callback = jest.fn();
      groupProgressService.getNumberOfFinishedTasks(
        "groupIdentifier",
        callback
      );
      expect(callback).toHaveBeenCalledWith(
        new CallbackNumberDTO(false, "Group progress nicht gefunden", -1)
      );
    });
  });
});
