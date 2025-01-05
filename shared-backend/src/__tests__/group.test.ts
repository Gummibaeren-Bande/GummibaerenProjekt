import GroupSet from "../entities/GroupSet";
import Group from "../entities/Group";
import GroupProgress from "../entities/GroupProgress";
import TaskSet from "../entities/TaskSet";
import taskList from "../taskList";
import TrackableTask from "../entities/TrackableTask";

const taskSet = new TaskSet();
taskSet.uploadTaskSet(taskList);
const groupSet = new GroupSet();

describe("GroupSet", () => {
  it("should add a new group with the given name and task set", () => {
    expect(groupSet.addNewGroup("group1", taskSet)).toBe(true);
  });
  it("should not add a new group with the same name", () => {
    expect(groupSet.addNewGroup("group1", taskSet)).toBe(false);
  });
  it("should get a group by name", () => {
    expect(groupSet.getGroupByName("group1")).toBeInstanceOf(Group);
  });
  it("should throw an error if the group does not exist", () => {
    expect(() => groupSet.getGroupByName("group2")).toThrow(
      "No group with the given name found"
    );
  });
});

const group = new Group("group1", taskSet);

describe("Group", () => {
  it("should create a new group with the given name and task set", () => {
    expect(group.getName()).toEqual("group1");
    expect(group.getGroupProgress()).toBeInstanceOf(GroupProgress);
  });
});

describe("GroupProgress", () => {
  const groupProgress = group.getGroupProgress();
  it("should get the started date", () => {
    expect(groupProgress.getStartedAt()).toBeInstanceOf(Date);
  });
  it("should get the current task", () => {
    expect(groupProgress.getCurrentTask()).toBeInstanceOf(TrackableTask);
  });
  it("should get the number of finished tasks", async () => {
    expect(groupProgress.getNumberOfFinishedTasks()).toBe(0);
    groupProgress.getCurrentTask().startTask();
    await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure state change
    groupProgress.goToNextTask();
    await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure state change
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
  it("should finish the work", async () => {
    expect(() => groupProgress.finishWork()).toThrow(
      "The group progress can't be finished, there are still unfinished tasks left."
    );
    while (groupProgress.hasNextTask()) {
      groupProgress.getCurrentTask().startTask();
      await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure state change
      groupProgress.goToNextTask();
      await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure state change
    }
    groupProgress.getCurrentTask().startTask();
    await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure state change
    expect(() => groupProgress.goToNextTask()).toThrow(
      "No more tasks left to work on"
    );
    groupProgress.finishWork();
    expect(groupProgress.getFinishedWork()).toBe(true);
    expect(groupProgress.getNumberOfFinishedTasks()).toBe(taskList.length);
    expect(groupProgress.getFinishedAfterSeconds()).not.toBeNull();
    expect(groupProgress.getFinishedAfterSeconds()).toBeGreaterThan(0);
  });
});
