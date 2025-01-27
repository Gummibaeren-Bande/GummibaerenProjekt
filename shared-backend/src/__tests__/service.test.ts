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
import GroupSet from "../entities/GroupSet";
import CallbackNumberDTO from "../dtos/CallbackDTOs/CallbackNumberDTO";
import CallbackExerciseDTO from "../dtos/CallbackDTOs/CallbackExerciseDTO";
import ExerciseDTO from "../dtos/ExerciseDTO";
import TaskSet from "../entities/TaskSet";

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
      SOCKET_1,
    );
  });
  it("should remove a socket", () => {
    teacherEmitsService.removeSocket(SOCKET_1);
    // @ts-ignore
    expect(teacherEmitsService.teacherSocketsManager.sockets).not.toContain(
      SOCKET_1,
    );
    // @ts-ignore
    expect(teacherEmitsService.teacherSocketsManager.sockets).not.toContain(
      SOCKET_2,
    );
  });
  it("should emit a changed group set to all sockets", () => {
    const groupSet = new GroupSet(
      new GroupSetService(new TaskService(), teacherEmitsService),
    );
    const emitSpy = jest.spyOn(SOCKET_1, "emit");
    teacherEmitsService.addSocket(SOCKET_1);
    teacherEmitsService.emitChangedGroupSetToAllSockets(
      groupSet,
      new TaskSet(),
    );
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
      new CallbackSuccessDTO(false, "Socket konnte nicht gefunden werden!"),
    );
    groupSetService.addGroup(groupIdentifier, callback, SOCKET_1);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        true,
        `Die Gruppe "group1" wurde erfolgreich erstellt`,
      ),
    );
    groupSetService.addGroup(groupIdentifier, callback, SOCKET_1);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        `Eine Gruppe mit dem Namen "group1" existiert bereits. Bitte wählt einen anderen Namen`,
      ),
    );
  });
  it("should reconnect to a group", () => {
    groupService.deassignSocketFromGroup(SOCKET_1);
    const callback = jest.fn();
    groupSetService.reconnectToGroup(groupIdentifier, callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(false, "Socket konnte nicht gefunden werden!"),
    );
    groupSetService.reconnectToGroup("groupIdentifier", callback, SOCKET_2);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        `Die Gruppe "groupIdentifier" existiert nicht.`,
      ),
    );
    groupSetService.reconnectToGroup(groupIdentifier, callback, SOCKET_2);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        true,
        `Erfolgreich als existierendes Teams "group1" eingeloggt.`,
      ),
    );
    groupSetService.reconnectToGroup(groupIdentifier, callback, SOCKET_1);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        `Die Gruppe "group1" ist bereits auf einem Gerät eingeloggt. Bitte schließe zunächst das Browserfenster auf diesem Gerät.`,
      ),
    );
  });
  it("should not add a group with empty string", () => {
    const empty_string = "";
    const callback = jest.fn();
    groupSetService.addGroup(empty_string, callback, SOCKET_1);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(false, "Der Teamname darf nicht leer sein!"),
    );
  });
  it("should not add a group with a short name", () => {
    const short_name = "42";
    const callback = jest.fn();
    groupSetService.addGroup(short_name, callback, SOCKET_1);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "Der Teamname muss zwischen 3 und 20 Zeichen lang sein!",
      ),
    );
  });
  it("should not add a group with a long name", () => {
    const long_name =
      "Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz";
    const callback = jest.fn();
    groupSetService.addGroup(long_name, callback, SOCKET_1);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "Der Teamname muss zwischen 3 und 20 Zeichen lang sein!",
      ),
    );
  });
  it("should not add a group if the name starts with space", () => {
    const starts_with_space = " Nein";
    const callback = jest.fn();
    groupSetService.addGroup(starts_with_space, callback, SOCKET_1);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "Der Teamname darf nicht mit einem Leerzeichen beginnen!",
      ),
    );
  });
  it("should not add a group if the name ends with space", () => {
    const ends_with_space = "Illuminati ";
    const callback = jest.fn();
    groupSetService.addGroup(ends_with_space, callback, SOCKET_1);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "Der Teamname darf nicht mit einem Leerzeichen enden!",
      ),
    );
  });
  it("should not add a group if the name has illegal characters", () => {
    const illegal_characters = "Ke$ha";
    const callback = jest.fn();
    groupSetService.addGroup(illegal_characters, callback, SOCKET_1);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "Der Teamname darf nur aus Buchstaben, Leerzeichen und Zahlen bestehen!",
      ),
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
        new CallbackSuccessDTO(false, "Es gibt noch Aufgaben zu erledigen"),
      );
      callback = jest.fn();
      groupProgressService.finishWork("groupIdentifier", callback);
      expect(callback).toHaveBeenCalledWith(
        new CallbackSuccessDTO(false, "Group progress nicht gefunden"),
      );
    });
    it("should get number of finished tasks", () => {
      let callback = jest.fn();
      groupProgressService.getNumberOfFinishedTasks(groupIdentifier, callback);
      expect(callback).toHaveBeenCalledWith(new CallbackNumberDTO(true, "", 0));
      callback = jest.fn();
      groupProgressService.getNumberOfFinishedTasks(
        "groupIdentifier",
        callback,
      );
      expect(callback).toHaveBeenCalledWith(
        new CallbackNumberDTO(false, "Group progress nicht gefunden", -1),
      );
    });
  });
});

describe("TrackableTaskService", () => {
  const taskService = new TaskService();
  taskService.uploadTaskSet(taskList);
  const teacherEmitsService = new TeacherEmitsService();
  const groupSetService = new GroupSetService(taskService, teacherEmitsService);
  const groupService = new GroupService(groupSetService);
  const groupProgressService = new GroupProgressService(groupService);
  const trackableTaskService = new TrackableTaskService(groupProgressService);

  it("should choose an alternative exercise", () => {
    const callback = jest.fn();
    trackableTaskService.chooseAlternativForTask(
      "taskId",
      "groupName",
      "dummy_id",
      callback,
    );
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(false, "Group progress not found for this group!"),
    );
    groupSetService.addGroup(groupIdentifier, jest.fn(), SOCKET_1);
    trackableTaskService.chooseAlternativForTask(
      "taskId",
      groupIdentifier,
      "dummy_id",
      callback,
    );
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "task with the given id could not be found!",
      ),
    );
    trackableTaskService.chooseAlternativForTask(
      // @ts-ignore
      groupProgressService
        .getGroupProgressByGroupName(groupIdentifier)
        ?.getProgress()[0] // @ts-ignore
        .task.getId(),
      groupIdentifier,
      "dummy_id",
      callback,
    );
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "The task is in progress and can't be changed",
      ),
    );
    trackableTaskService.chooseAlternativForTask(
      // @ts-ignore
      groupProgressService
        .getGroupProgressByGroupName(groupIdentifier)
        ?.getProgress()[2] // @ts-ignore
        .task.getId(),
      groupIdentifier,
      groupProgressService
        .getGroupProgressByGroupName(groupIdentifier)
        ?.getProgress()[2] // @ts-ignore
        .task.getExercises()[1]
        .getId(),
      callback,
    );
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        true,
        "Alternative exercise was successfully chosen",
      ),
    );
    trackableTaskService.chooseAlternativForTask(
      // @ts-ignore
      groupProgressService
        .getGroupProgressByGroupName(groupIdentifier)
        ?.getProgress()[2] // @ts-ignore
        .task.getId(),
      groupIdentifier,
      "not_a_valid_id",
      callback,
    );
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "the given id of the exercise is not found",
      ),
    );
  });
  it("should skip a task", () => {
    const callback = jest.fn();
    trackableTaskService.skipTask("taskId", "groupName", callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(false, "Group progress not found for this group!"),
    );
    groupSetService.addGroup(groupIdentifier, jest.fn(), SOCKET_1);
    trackableTaskService.skipTask("taskId", groupIdentifier, callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "Task with the given id could not be found!",
      ),
    );
    trackableTaskService.skipTask(
      // @ts-ignore
      groupProgressService
        .getGroupProgressByGroupName(groupIdentifier)
        ?.getProgress()[0] // @ts-ignore
        .task.getId(),
      groupIdentifier,
      callback,
    );
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "The task is in progress and can't be skipped",
      ),
    );
    trackableTaskService.skipTask(
      // @ts-ignore
      groupProgressService
        .getGroupProgressByGroupName(groupIdentifier)
        ?.getProgress()[1] // @ts-ignore
        .task.getId(),
      groupIdentifier,
      callback,
    );
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(true, "Task was successfully skipped"),
    );
  });
  it("should revert a task skip", () => {
    const callback = jest.fn();
    trackableTaskService.revertTaskSkip("taskId", "groupName", callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(false, "Group progress not found for this group!"),
    );
    groupSetService.addGroup(groupIdentifier, jest.fn(), SOCKET_1);
    trackableTaskService.revertTaskSkip("taskId", groupIdentifier, callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "Task with the given id could not be found!",
      ),
    );
    trackableTaskService.revertTaskSkip(
      // @ts-ignore
      groupProgressService
        .getGroupProgressByGroupName(groupIdentifier)
        ?.getProgress()[0] // @ts-ignore
        .task.getId(),
      groupIdentifier,
      callback,
    );
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "The task is in progress and can't be skipped",
      ),
    );
    trackableTaskService.revertTaskSkip(
      // @ts-ignore
      groupProgressService
        .getGroupProgressByGroupName(groupIdentifier)
        ?.getProgress()[1] // @ts-ignore
        .task.getId(),
      groupIdentifier,
      callback,
    );
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(true, "Task skip successfully reverted"),
    );
  });
});

describe("ExerciseService", () => {
  const taskService = new TaskService();
  taskService.uploadTaskSet(taskList);
  const teacherEmitsService = new TeacherEmitsService();
  const groupSetService = new GroupSetService(taskService, teacherEmitsService);
  const groupService = new GroupService(groupSetService);
  const groupProgressService = new GroupProgressService(groupService);
  const trackableTaskService = new TrackableTaskService(groupProgressService);
  const exerciseService = new ExerciseService(trackableTaskService);

  it("should get an exercise", () => {
    const callback = jest.fn();
    exerciseService.getCurrentExerciseOfGroup("groupName", callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackExerciseDTO(
        false,
        "Keine aktuelle Aufgabe gefunden",
        false,
        null,
      ),
    );
    groupSetService.addGroup(groupIdentifier, jest.fn(), SOCKET_1);
    exerciseService.getCurrentExerciseOfGroup(groupIdentifier, callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackExerciseDTO(true, "", false, expect.any(ExerciseDTO)),
    );
  });
  it("should fail to get the next exercise", () => {
    const callback = jest.fn();
    exerciseService.getNextExerciceOfGroup("groupName", callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackExerciseDTO(
        false,
        "Die Gruppe wurde nicht gefunden",
        false,
        null,
      ),
    );
    groupSetService.addGroup(groupIdentifier, jest.fn(), SOCKET_1);
    exerciseService.getNextExerciceOfGroup(groupIdentifier, callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackExerciseDTO(
        false,
        "The current task has not been completed yet",
        false,
        null,
      ),
    );
  });
  it("should answer the current exercise", async () => {
    const callback = jest.fn();
    groupSetService.addGroup(groupIdentifier, jest.fn(), SOCKET_1);
    await exerciseService.getCurrentExerciseOfGroup(
      groupIdentifier,
      (response: CallbackExerciseDTO) => {
        if (!response.exercise) {
          return;
        }
        const exerciseId = response.exercise.id;
        exerciseService.answerCurrentExercise(
          "groupIdentifier",
          exerciseId,
          82,
          callback,
        );
        expect(callback).toHaveBeenCalledWith(
          new CallbackSuccessDTO(false, "Keine aktuelle Aufgabe gefunden"),
        );
        exerciseService.answerCurrentExercise(
          groupIdentifier,
          "exerciseId",
          82,
          callback,
        );
        expect(callback).toHaveBeenCalledWith(
          new CallbackSuccessDTO(
            false,
            "Die gegebene ID stimmt nicht mit der ID der aktuellen Aufgabe überein",
          ),
        );
        exerciseService.answerCurrentExercise(
          groupIdentifier,
          exerciseId,
          42,
          callback,
        );
        expect(callback).toHaveBeenCalledWith(
          new CallbackSuccessDTO(false, "Die Antwort war falsch"),
        );
        exerciseService.answerCurrentExercise(
          groupIdentifier,
          exerciseId,
          82,
          callback,
        );
        expect(callback).toHaveBeenCalledWith(
          new CallbackSuccessDTO(true, "Die Antwort war richtig"),
        );
      },
    );
  });
  it("should finish the set", async () => {
    const callback = jest.fn();
    exerciseService.getNextExerciceOfGroup(groupIdentifier, callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackExerciseDTO(true, "", false, expect.any(ExerciseDTO)),
    );
    await exerciseService.getCurrentExerciseOfGroup(
      groupIdentifier,
      (response: CallbackExerciseDTO) => {
        if (!response.exercise) {
          return;
        }
        const exerciseId = response.exercise.id;
        exerciseService.answerCurrentExercise(
          groupIdentifier,
          exerciseId,
          32,
          callback,
        );
        expect(callback).toHaveBeenCalledWith(
          new CallbackSuccessDTO(true, "Die Antwort war richtig"),
        );
      },
    );
    await exerciseService.getNextExerciceOfGroup(
      groupIdentifier,
      (response: CallbackExerciseDTO) => {
        if (!response.exercise) {
          return;
        }
        const exerciseId = response.exercise.id;
        exerciseService.answerCurrentExercise(
          groupIdentifier,
          exerciseId,
          [0],
          callback,
        );
        expect(callback).toHaveBeenCalledWith(
          new CallbackSuccessDTO(true, "Die Antwort war richtig"),
        );
      },
    );
    trackableTaskService.skipTask(
      // @ts-ignore
      groupProgressService
        .getGroupProgressByGroupName(groupIdentifier)
        ?.getProgress()[1] // @ts-ignore
        .task.getId(),
      groupIdentifier,
      callback,
    );
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "The task is already completed and can't be skipped",
      ),
    );
    trackableTaskService.chooseAlternativForTask(
      // @ts-ignore
      groupProgressService
        .getGroupProgressByGroupName(groupIdentifier)
        ?.getProgress()[1] // @ts-ignore
        .task.getId(),
      groupIdentifier,
      0,
      callback,
    );
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(
        false,
        "The task is already completed and can't be changed",
      ),
    );
    await exerciseService.getNextExerciceOfGroup(
      groupIdentifier,
      (response: CallbackExerciseDTO) => {
        if (!response.exercise) {
          return;
        }
        const exerciseId = response.exercise.id;
        exerciseService.answerCurrentExercise(
          groupIdentifier,
          exerciseId,
          [0],
          callback,
        );
        expect(callback).toHaveBeenCalledWith(
          new CallbackSuccessDTO(true, "Die Antwort war richtig"),
        );
      },
    );
    exerciseService.getNextExerciceOfGroup(groupIdentifier, callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackExerciseDTO(
        false,
        "Die Gruppe hat keine weiteren Aufgaben",
        true,
        null,
      ),
    );
    groupProgressService.finishWork(groupIdentifier, callback);
    expect(callback).toHaveBeenCalledWith(
      new CallbackSuccessDTO(true, "Alle Aufgaben wurden erledigt"),
    );
  });
});

describe("WelcomeService", () => {
  const taskService = new TaskService();
  taskService.uploadTaskSet(taskList);
  const teacherEmitsService = new TeacherEmitsService();
  const groupSetService = new GroupSetService(taskService, teacherEmitsService);
  const groupService = new GroupService(groupSetService);
  const welcomeService = new WelcomeService(groupService, teacherEmitsService);

  it("should handle socket connections", () => {
    welcomeService.socketConnectionOpened(SOCKET_1, true);
    // @ts-ignore
    expect(teacherEmitsService.teacherSocketsManager.sockets).toContain(
      SOCKET_1,
    );
    welcomeService.socketConnectionClosed(SOCKET_1, "forced close", true);
    // @ts-ignore
    expect(teacherEmitsService.teacherSocketsManager.sockets).not.toContain(
      SOCKET_1,
    );
    groupSetService.addGroup(groupIdentifier, jest.fn(), SOCKET_2);
    welcomeService.socketConnectionOpened(SOCKET_2, false);
    expect(
      groupSetService.getGroupSet().tryGroupBySocket(SOCKET_2),
    ).toBeDefined();
    welcomeService.socketConnectionClosed(SOCKET_2, "forced close", false);
    expect(
      groupSetService.getGroupSet().tryGroupBySocket(SOCKET_2),
    ).toBeUndefined();
  });
});
