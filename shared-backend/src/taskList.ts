import Task from "./entities/Task";
import NumericalExercise from "./entities/NumericalExercise";
import MultipleChoiceExercise from "./entities/MultipleChoiceExercise";

let taskList = [
  new Task("Task 1", [
    new NumericalExercise("Exercise 1a", "Description 1a", "Question 1a", 1),
    new MultipleChoiceExercise(
      "Exercise 1b",
      "Description 1b",
      "Question 1b",
      ["Answer 1", "Answer 2", "Answer 3"],
      [0, 1],
    ),
  ]),
  new Task("Task 2", [
    new NumericalExercise("Exercise 2", "Description 2", "Question 2", 2),
  ]),
  new Task("Task 3", [
    new NumericalExercise("Exercise 3a", "Description 3a", "Question 3a", 3),
    new MultipleChoiceExercise(
      "Exercise 3b",
      "Description 3b",
      "Question 3b",
      ["Answer 1", "Answer 2", "Answer 3"],
      [0, 2],
    ),
  ]),
];

export default taskList;
