import Task from "./entities/Task";
import NumericalExercise from "./entities/NumericalExercise";
import MultipleChoiceExercise from "./entities/MultipleChoiceExercise";

/**
 * This is the list of tasks that will be used for the application.
 */
const taskList = [
  new Task("Binärzahlumrechnung", [
    new NumericalExercise(
      "Binärzahl in Dezimalzahl umrechnen",
      "###Wandle die folgende Binärzahl in eine Dezimalzahl um.",
      "01010010",
      82,
    ),
  ]),
  new Task("Gummibärchen Verteilung", [
    new NumericalExercise(
      "Gummibärchen Verteilung",
      "In einer Gummibärchenpackung gibt es insgesamt 256 Gummibärchen. Diese sollen jetzt auf Tom, Alice, Jonas, Friedrich, Tabea, Michi, Lisa und Felix aufgeteilt werden.",
      "Wie viele Gummibärchen bekommt jeder?",
      32,
    ),
  ]),
  new Task("Dezimalzahlumrechnung", [
    new MultipleChoiceExercise(
      "Dezimalzahl in Binärzahl umrechnen",
      "Wandle die folgende Dezimalzahl in eine Binärzahl um.",
      "42",
      ["101010", "101011", "101100"],
      [0],
    ),
    new MultipleChoiceExercise(
      "Dezimalzahl in Binärzahl umrechnen",
      "Welche Bits müssen gesetzt werden, um die folgende Dezimalzahl zu erhalten?",
      "42",
      ["Bit 6", "Bit 5", "Bit 4", "Bit 3", "Bit 2", "Bit 1"],
      [0, 2, 4],
    ),
    new NumericalExercise(
      "Langer Aufgabentitel für eine Dezimalzahlumrechnung der schön angezeigt werden soll",
      "Wandle 42 in eine Dezimalzahl um.",
      "",
      101010
    )
  ]),
  new Task("Gummibärchen Geschmack", [
    new MultipleChoiceExercise(
      "Gummibärchen Geschmacksrichtungen",
      "",
      "Welche der folgenden Geschmacksrichtungen gibt es typischerweise bei Gummibärchen?",
      [
        "A) Erdbeere, Zitrone, Himbeere, Orange, Apfel und Ananas",
        "B) Banane, Kirsche, Mango, Pfirsich, Limette und Maracuja",
        "C) Vanille, Schokolade, Zimt, Kokos, Pfefferminze und Brombeere",
        "D) Wassermelone, Kiwi, Heidelbeere, Passionsfrucht, Pflaume und Grapefruit",
      ],
      [0],
    ),
  ]),
];

export default taskList;
