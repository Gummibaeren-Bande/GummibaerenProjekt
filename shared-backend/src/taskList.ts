import Task from "./entities/Task";
import NumericalExercise from "./entities/NumericalExercise";
import MultipleChoiceExercise from "./entities/MultipleChoiceExercise";

/**
 * This is the list of tasks that will be used for the application.
 */
const taskList = [
  new Task("[ ] + [ ]", [
    new MultipleChoiceExercise(
      "Frage 1",
      "Wozu wertet folgende JavaScript Expression aus?",
      "[ ] + [ ]",
      ['0', '[ ]', '""', '"[object Object]"'],
      [2],
    ),
  ]),
  new Task("[ ] + { }", [
    new MultipleChoiceExercise(
      "Frage 2",
      "Wozu wertet folgende JavaScript Expression aus?",
      "[ ] + { }",
      ['0', '[ ]', '""', '"[object Object]"'],
      [3],
    ),
  ]),
  new Task("{ } + [ ]", [
    new MultipleChoiceExercise(
      "Frage 3",
      "Wozu wertet folgende JavaScript Expression aus?",
      "{ } + [ ]",
      ['0', '[ ]', '""', '"[object Object]"'],
      [0],
    ),
  ]),
  new Task('9 + "1"', [
    new MultipleChoiceExercise(
      "Frage 4",
      "Wozu wertet folgende JavaScript Expression aus?",
      '9 + "1"',
      ['10', '"10"', '91', '"91"'],
      [3],
    ),
  ]),
  new Task('91 - "1"', [
    new MultipleChoiceExercise(
      "Frage 5 - einfach",
      "Wozu wertet folgende JavaScript Expression aus?",
      '91 - "1"',
      ['90', '"90"', '9', '"9"'],
      [0],
    ),
    new NumericalExercise(
      "Frage 5 - schwierig",
      "Wozu wertet folgende JavaScript Expression aus?",
      '(!+[]+[]+![]).length',
      9
    ),
  ]),

];

export default taskList;
