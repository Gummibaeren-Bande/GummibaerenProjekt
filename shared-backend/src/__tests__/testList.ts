import Task from "../entities/Task";
import NumericalExercise from "../entities/NumericalExercise";
import MultipleChoiceExercise from "../entities/MultipleChoiceExercise";

/**
 * This is a list of dummy tasks that will be used for testing.
 */
const testList = [
  new Task("TestTask1", [
    new NumericalExercise(
      "TestExercise1",
      "TestDescription1",
      "TestQuestion1",
      1,
    ),
  ]),
  new Task("TestTask2", [
    new NumericalExercise(
      "TestExercise2",
      "TestDescription2",
      "TestQuestion2",
      2,
    ),
  ]),
  new Task("TestTask3", [
    new MultipleChoiceExercise(
      "TestExercise3a",
      "TestDescription3a",
      "TestQuestion3a",
      ["TestOption1a", "TestOption2a", "TestOption3a"],
      [0],
    ),
    new MultipleChoiceExercise(
      "TestExercise3b",
      "TestDescription3b",
      "TestQuestion3b",
      ["TestOption1b", "TestOption2b", "TestOption3b"],
      [0, 1],
    ),
  ]),
  new Task("TestTask4", [
    new MultipleChoiceExercise(
      "TestExercise4",
      "TestDescription4",
      "TestQuestion4",
      ["TestOption1", "TestOption2", "TestOption3"],
      [0],
    ),
  ]),
];

export default testList;
