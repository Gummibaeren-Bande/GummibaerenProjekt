import GroupSet from "../entities/GroupSet";
import Group from "../entities/Group";
import GroupProgress from "../entities/GroupProgress";
import TaskSet from "../entities/TaskSet";
import taskList from "../taskList";
import TrackableTask from "../entities/TrackableTask";
import TrackableTaskState from "../enums/TrackableTaskState";

const GROUP_NAME = "group1";
const NON_EXISTENT_GROUP_NAME = "group2";

describe("GroupSet", () => {
  let taskSet: TaskSet;
  let groupSet: GroupSet;

  beforeEach(() => {
    taskSet = new TaskSet();
    taskSet.uploadTaskSet(taskList);
    groupSet = new GroupSet();
  });

  it("should add a new group with the given name and task set", () => {
    expect(groupSet.addNewGroup(GROUP_NAME, taskSet)).toBe(true);
  });

  it("should not add a new group with the same name", () => {
    groupSet.addNewGroup(GROUP_NAME, taskSet);
    expect(groupSet.addNewGroup(GROUP_NAME, taskSet)).toBe(false);
  });

  it("should get a group by name", () => {
    groupSet.addNewGroup(GROUP_NAME, taskSet);
    expect(groupSet.getGroupByName(GROUP_NAME)).toBeInstanceOf(Group);
  });

  it("should throw an error if the group does not exist", () => {
    expect(() => groupSet.getGroupByName(NON_EXISTENT_GROUP_NAME)).toThrow(
      "No group with the given name found",
    );
  });
});

describe("Group", () => {
  let group: Group;

  beforeEach(() => {
    const taskSet = new TaskSet();
    taskSet.uploadTaskSet(taskList);
    group = new Group(GROUP_NAME, taskSet);
  });

  it("should create a new group with the given name and task set", () => {
    expect(group.getName()).toEqual(GROUP_NAME);
    expect(group.getGroupProgress()).toBeInstanceOf(GroupProgress);
  });
});

describe("GroupProgress", () => {
  let groupProgress: GroupProgress;

  beforeEach(() => {
    const taskSet = new TaskSet();
    taskSet.uploadTaskSet(taskList);
    const group = new Group(GROUP_NAME, taskSet);
    groupProgress = group.getGroupProgress();
  });

  it("should get the started date", () => {
    expect(groupProgress.getStartedAt()).toBeInstanceOf(Date);
  });

  it("should get the current task", () => {
    expect(groupProgress.getCurrentTask()).toBeInstanceOf(TrackableTask);
  });

  it("should get the number of finished tasks", () => {
    expect(groupProgress.getNumberOfFinishedTasks()).toBe(0);
    groupProgress.getCurrentTask().startTask();
    groupProgress.getCurrentTask().complete();
    expect(groupProgress.getCurrentTask().state).toBe(
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
