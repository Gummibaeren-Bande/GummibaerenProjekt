import Task from "../entities/Task";
import TrackableTask from "../entities/TrackableTask";
import TaskSet from "../entities/TaskSet";
import NumericalExercise from "../entities/NumericalExercise";
import MultipleChoiceExercise from "../entities/MultipleChoiceExercise";
import TrackableTaskState from "../enums/TrackableTaskState";

const exercise1a = new NumericalExercise(
  "Exercise 1a",
  "Description 1a",
  "Question 1a",
  1
);
const exercise1b = new MultipleChoiceExercise(
  "Exercise 1b",
  "Description 1b",
  "Question 1b",
  ["Answer 1", "Answer 2", "Answer 3"],
  [0, 1]
);
const exercise2 = new NumericalExercise(
  "Exercise 2",
  "Description 2",
  "Question 2",
  2
);
const exercise3a = new NumericalExercise(
  "Exercise 3a",
  "Description 3a",
  "Question 3a",
  3
);
const exercise3b = new MultipleChoiceExercise(
  "Exercise 3b",
  "Description 3b",
  "Question 3b",
  ["Answer 1", "Answer 2", "Answer 3"],
  [0]
);

const task1 = new Task("Task 1", [exercise1a, exercise1b]);
const task2 = new Task("Task 2", [exercise2]);
const task3 = new Task("Task 3", [exercise3a, exercise3b]);

describe("Task", () => {
  it("should return the correct name", () => {
    expect(task1.getName()).toEqual("Task 1");
  });

  it("should return the correct exercises", () => {
    expect(task2.getExcercises()).toEqual([exercise2]);
  });

  it("should return a valid ID", () => {
    expect(task3.getId()).not.toBeNull();
  });
});

describe("TaskSet", () => {
  let taskSet: TaskSet;
  let tasks: Task[];

  beforeEach(() => {
    taskSet = new TaskSet();
    tasks = [task1, task2, task3];
    taskSet.uploadTaskSet(tasks);
  });

  it("should upload and return tasks", () => {
    expect(taskSet.getTasks()).toEqual(tasks);
  });
});

describe("TrackableTask", () => {
  let trackableTask: TrackableTask;

  beforeEach(() => {
    trackableTask = new TrackableTask(task1);
  });

  it("should return the correct state", () => {
    expect(trackableTask.state).toEqual("NotStarted");
  });

  it("should skip the task", () => {
    trackableTask.setSkipped(true);
    expect(trackableTask.state).toEqual("Skipped");
    expect(trackableTask.getSkipped()).toEqual(true);
  });

  it("should ignore trying to skip a task that is already skipped", () => {
    trackableTask.setSkipped(true);
    expect(trackableTask.state).toEqual("Skipped");
  });

  it("should unskip the task", () => {
    trackableTask.setSkipped(true);
    expect(trackableTask.state).toEqual("Skipped");
    trackableTask.setSkipped(false);
    expect(trackableTask.state).toEqual("NotStarted");
  });

  it("should throw an error when trying to complete a task that hasn't started", () => {
    expect(() => trackableTask.complete()).toThrow(
      "The task has not been started yet and therefore can't be finished"
    );
  });

  it("should return the correct exercise", () => {
    expect(trackableTask.getChosenExercise()).toEqual(exercise1a);
  });

  it("should set an alternative exercise", () => {
    trackableTask.setAlternativeExercise(1);
    expect(trackableTask.getChosenExercise()).toEqual(exercise1b);
    trackableTask.setSkipped(true);
    trackableTask.setAlternativeExercise(0);
    expect(trackableTask.getChosenExercise()).toEqual(exercise1a);
  });

  it("should return the correct task", () => {
    expect(trackableTask.getTask()).toEqual(task1);
  });

  it("should start the task", () => {
    trackableTask.startTask();
    expect(trackableTask.state).toEqual("InProgress");
  });

  it("should throw an error when trying to start a task that has already started", () => {
    trackableTask.startTask();
    expect(() => trackableTask.startTask()).toThrow(
      "The task has already been started"
    );
  });

  it("should return the start time", () => {
    trackableTask.startTask();
    expect(trackableTask.getStartedAt()).toBeInstanceOf(Date);
  });

  it("should return the correct number of tries", () => {
    expect(trackableTask.getTries()).toEqual(0);
  });

  it("should increment the number of tries", () => {
    trackableTask.incrementTries();
    expect(trackableTask.getTries()).toEqual(1);
  });

  it("should return the correct skip state", () => {
    expect(trackableTask.getSkipped()).toEqual(false);
  });

  it("should throw an error when trying to skip a task in progress", () => {
    trackableTask.startTask();
    expect(() => trackableTask.setSkipped(true)).toThrow(
      "The task is in progress and can't be skipped"
    );
  });

  it("should throw an error when trying to change the exercise in progress", () => {
    trackableTask.startTask();
    expect(() => trackableTask.setAlternativeExercise(0)).toThrow(
      "The task is in progress and can't be changed"
    );
  });

  it("should complete the task", () => {
    trackableTask.startTask();
    trackableTask.complete();
    expect(trackableTask.state).toEqual(TrackableTaskState.Completed);
  });

  it("should return a valid completion time", async () => {
    trackableTask.startTask();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    trackableTask.complete();
    expect(trackableTask.getFinishedAfterSeconds()).not.toBeNull();
    expect(trackableTask.getFinishedAfterSeconds()).toBeGreaterThan(0);
  });

  it("should throw an error when trying to skip a completed task", () => {
    trackableTask.startTask();
    trackableTask.complete();
    expect(() => trackableTask.setSkipped(true)).toThrow(
      "The task is already completed and can't be skipped"
    );
  });

  it("should throw an error when trying to change the exercise after completion", () => {
    trackableTask.startTask();
    trackableTask.complete();
    expect(() => trackableTask.setAlternativeExercise(0)).toThrow(
      "The task is already completed and can't be changed"
    );
  });
});
