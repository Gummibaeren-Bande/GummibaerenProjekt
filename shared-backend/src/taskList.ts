import Task from "./entities/Task";
import NumericalExercise from "./entities/NumericalExercise";
import MultipleChoiceExercise from "./entities/MultipleChoiceExercise";

/**
 * This is a list of dummy tasks that will be used for testing.
 */
let taskList = [
  new Task("Binärzahlumrechnung", [
    new NumericalExercise(
      "Binärzahl in Dezimalzahl umrechnen",
      "Wandle die folgende Binärzahl in eine Dezimalzahl um.",
      "01010010",
      82
    ),
  ]),
  new Task("Dezimalzahlumrechnung", [
    new MultipleChoiceExercise(
      "Dezimalzahl in Binärzahl umrechnen",
      "Wandle die folgende Dezimalzahl in eine Binärzahl um.",
      "42",
      ["101010", "101011", "101100"],
      [0]
    ),
    new MultipleChoiceExercise(
      "Dezimalzahl in Binärzahl umrechnen",
      "Welche Bits müssen gesetzt werden, um die folgende Dezimalzahl zu erhalten?",
      "42",
      ["Bit 6", "Bit 5", "Bit 4", "Bit 3", "Bit 2", "Bit 1"],
      [0, 2, 4]
    ),
  ]),
];

export default taskList;
