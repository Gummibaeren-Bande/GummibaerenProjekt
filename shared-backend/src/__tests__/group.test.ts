import GroupSet from "../entities/GroupSet";
import Group from "../entities/Group";
import GroupProgress from "../entities/GroupProgress";
import TaskSet from "../entities/TaskSet";
import taskList from "../taskList";
import TrackableTask from "../entities/TrackableTask";
import TrackableTaskState from "../enums/TrackableTaskState";
import IoSocket from "../types/IoSocket";
import GroupSetService from "../api/group-set/GroupSetService";
import TaskService from "../api/task/TaskService"
import TeacherEmitsService from "../api/teacher-emits/TeacherEmitsService";

const GROUP_NAME = "group1";
const NON_EXISTENT_GROUP_NAME = "group2";
const TEST_ID = "abcd12345";
const TEST_ID_2 = "efgh67890";
const SOCKET_1 = { id: TEST_ID } as unknown as IoSocket;
const SOCKET_2 = { id: TEST_ID_2 } as unknown as IoSocket;

describe("GroupSet", () => {
  let taskSet: TaskSet;
  let groupSet: GroupSet;
  let taskService: TaskService;
  let teacherEmitsService: TeacherEmitsService;
  let groupSetService: GroupSetService;


  beforeEach(() => {
    taskSet = new TaskSet();
    taskSet.uploadTaskSet(taskList);
    taskService = new TaskService();
    teacherEmitsService = new TeacherEmitsService();
    groupSetService = new GroupSetService(taskService, teacherEmitsService);
    groupSet = new GroupSet(groupSetService);
  });

  it("should add a new group with the given name and task set", () => {
    expect(
      groupSet.addNewGroup(GROUP_NAME, null as unknown as IoSocket, taskSet),
    ).toBe(true);
  });

  it("should not add a new group with the same name", () => {
    groupSet.addNewGroup(GROUP_NAME, null as unknown as IoSocket, taskSet);
    expect(
      groupSet.addNewGroup(GROUP_NAME, null as unknown as IoSocket, taskSet),
    ).toBe(false);
  });

  it("should get a group by name", () => {
    groupSet.addNewGroup(GROUP_NAME, null as unknown as IoSocket, taskSet);
    expect(groupSet.getGroupByName(GROUP_NAME)).toBeInstanceOf(Group);
  });

  it("should not return a group if group does not exist", () => {
    expect(groupSet.getGroupByName(NON_EXISTENT_GROUP_NAME)).toBeUndefined();
  });

  it("should get the socket id of the assigned socket", () => {
    groupSet.addNewGroup(GROUP_NAME, SOCKET_1, taskSet);
    const id = groupSet.getGroupByName(GROUP_NAME)?.getAssignedSocketId();
    expect(id).toBe(TEST_ID);
  });

  it("should return null as socket id after the socket is deassigned", () => {
    groupSet.addNewGroup(GROUP_NAME, SOCKET_1, taskSet);
    const group = groupSet.getGroupByName(GROUP_NAME);
    group?.deassignSocket();
    expect(group?.getAssignedSocketId()).toBeNull();
  });

  it("hasAssignedSocket should return false if socket was deassigned", () => {
    groupSet.addNewGroup(GROUP_NAME, SOCKET_1, taskSet);
    const group = groupSet.getGroupByName(GROUP_NAME);
    group?.deassignSocket();
    expect(group?.hasAssignedSocket()).toBeFalsy();
  });

  it("hasAssignedSocket should return true if socket is assigned", () => {
    groupSet.addNewGroup(GROUP_NAME, SOCKET_1, taskSet);
    const group = groupSet.getGroupByName(GROUP_NAME);
    expect(group?.hasAssignedSocket()).toBeTruthy();
  });

  it("setAssignedSocket should throw an error if there is already a socket assigned", () => {
    groupSet.addNewGroup(GROUP_NAME, SOCKET_1, taskSet);
    const group = groupSet.getGroupByName(GROUP_NAME);
    expect(() => group?.setAssignedSocket(SOCKET_2)).toThrow(
      `Socket for group ${group?.getName()} is already assigned!`,
    );
  });

  it("hasAssignedSocket should assigned a new socket if old socket was deassigned", () => {
    groupSet.addNewGroup(GROUP_NAME, SOCKET_1, taskSet);
    const group = groupSet.getGroupByName(GROUP_NAME);
    group?.deassignSocket();
    group?.setAssignedSocket(SOCKET_2);
    expect(group?.getAssignedSocketId()).toBe(TEST_ID_2);
  });

  it("tryGroupBySocket should return the group with the assigned socket", () => {
    groupSet.addNewGroup(GROUP_NAME, SOCKET_1, taskSet);
    const group = groupSet.getGroupByName(GROUP_NAME);
    const groupBySocket = groupSet.tryGroupBySocket(SOCKET_1);
    expect(group).toBe(groupBySocket);
  });

  it("tryGroupBySocket should return undefined if a group with the given socket does not exist", () => {
    groupSet.addNewGroup(GROUP_NAME, SOCKET_1, taskSet);
    const groupBySocket = groupSet.tryGroupBySocket(SOCKET_2);
    expect(groupBySocket).toBeUndefined();
  });
});

describe("Group", () => {
  let group: Group;
  let groupSet: GroupSet;
  let taskService: TaskService;
  let teacherEmitsService: TeacherEmitsService;
  let groupSetService: GroupSetService;


  beforeEach(() => {
    taskService = new TaskService();
    teacherEmitsService = new TeacherEmitsService();
    groupSetService = new GroupSetService(taskService, teacherEmitsService);
    groupSet = new GroupSet(groupSetService);
    const taskSet = new TaskSet();
    taskSet.uploadTaskSet(taskList);
    group = new Group(GROUP_NAME, null as unknown as IoSocket, taskSet, groupSetService);

  });


  it("should create a new group with the given name and task set", () => {
    expect(group.getName()).toEqual(GROUP_NAME);
    expect(group.getGroupProgress()).toBeInstanceOf(GroupProgress);
  });
});

describe("GroupProgress", () => {
  let groupProgress: GroupProgress;
  let groupSet: GroupSet;
  let taskService: TaskService;
  let teacherEmitsService: TeacherEmitsService;
  let groupSetService: GroupSetService;

  beforeEach(() => {
    taskService = new TaskService();
    teacherEmitsService = new TeacherEmitsService();
    groupSetService = new GroupSetService(taskService, teacherEmitsService);
    groupSet = new GroupSet(groupSetService);
    const taskSet = new TaskSet();
    taskSet.uploadTaskSet(taskList);
    const group = new Group(GROUP_NAME, null as unknown as IoSocket, taskSet, groupSetService);
    groupProgress = group.getGroupProgress();
  });

  it("should get the started date", () => {
    expect(groupProgress.getStartedAt()).toBeInstanceOf(Date);
  });

  it("should throw an error if trying to goto the next task before completing it", () => {
    expect(() => groupProgress.goToNextTask()).toThrow(
      "The current task has not been completed yet",
    );
  });

  it("should find a task by Id", () => {
    expect(groupProgress.getTaskById(taskList[0].getId())).toBe(
      groupProgress.getCurrentTask(),
    );
  });

  it("should not return a task if task does not exist", () => {
    expect(groupProgress.getTaskById("nonExistentId")).toBeUndefined();
  });

  it("should get the current task", () => {
    expect(groupProgress.getCurrentTask()).toBeInstanceOf(TrackableTask);
  });

  it("should get the number of finished tasks", () => {
    expect(groupProgress.getNumberOfFinishedTasks()).toBe(0);
    groupProgress.getCurrentTask().startTask();
    groupProgress.getCurrentTask().complete();
    expect(groupProgress.getCurrentTask().getState()).toBe(
      TrackableTaskState.Completed,
    );
    expect(groupProgress.getNumberOfFinishedTasks()).toBe(1);
  });

  it("should not get the finished after seconds", () => {
    expect(groupProgress.getFinishedAfterSeconds()).toBeNull();
  });

  it("should get the finished work", () => {
    expect(groupProgress.getFinishedWork()).toBe(false);
  });

  it("should have a next task", () => {
    expect(groupProgress.hasNextTask()).toBe(true);
  });

  it("should finish the work", () => {
    expect(() => groupProgress.finishWork()).toThrow(
      "The group progress can't be finished, there are still unfinished tasks left.",
    );
    groupProgress.getCurrentTask().startTask();
    while (groupProgress.hasNextTask()) {
      groupProgress.getCurrentTask().complete();
      groupProgress.goToNextTask();
    }
    groupProgress.getCurrentTask().complete();
    expect(groupProgress.hasNextTask()).toBe(false);
    expect(() => groupProgress.goToNextTask()).toThrow(
      "No more tasks left to work on",
    );
    groupProgress.finishWork();
    expect(groupProgress.getFinishedWork()).toBe(true);
    expect(groupProgress.getNumberOfFinishedTasks()).toBe(taskList.length);
    expect(groupProgress.getFinishedAfterSeconds()).not.toBeNull();
    expect(groupProgress.getFinishedAfterSeconds()).toBeGreaterThan(0);
  });
});
