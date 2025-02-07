import Task from "./entities/Task";
import NumericalExercise from "./entities/NumericalExercise";
import MultipleChoiceExercise from "./entities/MultipleChoiceExercise";

/**
 * This is a list of dummy tasks that will be used for testing.
 */
const taskList = [
  new Task("Binärzahlumrechnung", [
    new NumericalExercise(
      "Binärzahl in Dezimalzahl umrechnen",
      "###Wandle die folgende Binärzahl in eine Dezimalzahl um. ![](https://platform.physik.kit.edu/hedgedoc/uploads/299d27bd-f820-4233-9b44-d57920bf31f3.jpg)",
      "01010010",
      82,
    ),
  ]),
  new Task("Gummibärchen Verteilung", [
    new NumericalExercise(
      "Gummibärchen Verteilung",
      "In einer Gummibärchenpackung gibt es ingesamt 256 Gummibärchen. Diese sollen jetzt auf Tom, Alice, Jonas, Friedrich, Tabea, Michi, Lisa und Felix aufgeteilt werden.",
      "Wie viele Gummibärchen bekommt jeder?",
      32,
    ),
  ]),
  new Task("Gummibärchen Verteilung Langer Text", [
    new NumericalExercise(
      "Gummibärchen Verteilung",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla eros sed magna tincidunt, vel dignissim mauris tincidunt. Nulla facilisi. Fusce eget velit urna. Pellentesque nec neque vel purus scelerisque tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris ac mi vitae ligula fringilla tincidunt eget nec justo. Integer fringilla mi nec metus vestibulum, at vehicula orci dapibus. Proin malesuada, lorem in eleifend bibendum, sapien mauris gravida odio, non tempor nisi lorem eu ligula. Curabitur cursus feugiat elit, ut efficitur elit tincidunt eget. Suspendisse potenti. Sed tristique tincidunt dui, ut feugiat enim bibendum eu. Nam ac tortor nec lectus elementum luctus. Vestibulum laoreet odio ac lorem ultricies, nec gravida justo viverra. Donec tincidunt neque vel magna suscipit, vel laoreet justo ultrices. Ut vel mi dapibus, lacinia neque sed, malesuada erat. Cras condimentum orci et sapien dapibus, a convallis mi luctus. Donec malesuada nunc quis elit tempus, eget scelerisque turpis cursus. Nulla facilisi. Nam nec lacus ut nunc efficitur dapibus. Aliquam erat volutpat. Vivamus at eros ut justo cursus luctus. Ut ut massa tristique, ornare ex vel, tempor justo. Duis consequat neque ac nisl suscipit, id congue metus aliquet. Donec non mauris ut nunc consequat condimentum. Phasellus at sapien malesuada, gravida metus ac, sodales massa. In eget mauris nulla. Suspendisse quis fringilla neque. Fusce et fermentum est, eget efficitur odio. Mauris venenatis nisi in risus egestas, in sollicitudin risus suscipit. Integer id sagittis ex. Nunc vel risus vel metus faucibus maximus. Morbi laoreet malesuada sapien at tempor. Phasellus quis magna in ligula feugiat sagittis. Ut suscipit turpis nec justo feugiat, sed scelerisque turpis vulputate. Suspendisse sed dui ac lectus faucibus tincidunt. Ut sed massa id turpis fermentum consectetur at eget justo. Sed vitae ultricies arcu. Nam rhoncus fringilla turpis, eu vehicula ligula fermentum a. Vivamus vulputate dictum diam, eget varius lectus maximus in. Donec nec efficitur nisi, in dignissim est. Nam a consectetur mi. Fusce dignissim velit a nulla rhoncus, a cursus felis scelerisque. Integer et tincidunt dui, nec faucibus orci. Donec ornare lectus ut enim dapibus, nec venenatis nulla eleifend. Pellentesque pharetra magna sed justo interdum, non vestibulum ipsum pharetra. Quisque scelerisque nunc id felis malesuada, et euismod erat sodales. Donec ac nibh metus. Nulla dictum, ligula eget tincidunt interdum, metus justo iaculis orci, non dignissim neque odio nec dui. Proin molestie dolor a urna malesuada consectetur. Phasellus nec orci risus. Suspendisse potenti. Suspendisse eu purus a quam dictum suscipit ac a arcu. Suspendisse et nulla metus. Donec vel augue nec nulla dignissim congue. Aenean congue elit justo, nec egestas mi gravida ut. Mauris in sem nisi. Aliquam erat volutpat. Fusce vel nisl ut sapien fermentum vehicula. Donec et nisi a lorem dapibus ullamcorper. Aenean vitae ultricies metus. Proin consectetur orci in dui cursus, et tincidunt erat vulputate. Curabitur imperdiet, orci ut congue efficitur, purus felis suscipit est, non facilisis magna enim et metus. Duis volutpat gravida libero, et tincidunt eros hendrerit sed. Nulla facilisi. Donec tempus metus vel ligula mollis, ut pellentesque libero eleifend. Praesent varius ligula id augue bibendum, ut interdum felis elementum. Nulla nec erat risus. Vestibulum posuere eros eu mauris euismod, a tristique sem dictum. Nullam accumsan mi nec nisi euismod, ut mollis mauris tincidunt. Pellentesque in dui non nisi vestibulum tincidunt non ac dui. Morbi vel magna nunc. Integer in nisi felis. Ut interdum ex eros, eu malesuada eros dictum sed. Vestibulum luctus vehicula orci, sit amet vestibulum ligula. Ves bulum sodales erat eu sapien auctor volutpat. Cras imperdiet, est nec pharetra vestibulum, lacus lacus fringilla dui, ut pellentesque felis libero nec elit. Morbi aliquet tortor quis tortor tincidunt, ut luctus elit interdum. Ut eu sapien massa. Morbi tristique, lacus at feugiat dapibus, eros risus vulputate ligula, ac lobortis enim odio in tortor. Mauris condimentum nibh nec purus convallis, non molestie eros suscipit. Proin et massa non ligula aliquet fermentum at ut nulla. Nunc nec mauris sit amet ipsum vehicula tincidunt. Aenean fermentum eros nec dui laoreet consectetur. Vivamus id turpis in enim faucibus rhoncus id eu nisl. Duis eu purus at odio malesuada maximus. In hendrerit arcu quis ex molestie, ut facilisis ligula gravida. Nulla ac tristique eros. Phasellus ultricies odio id tincidunt volutpat. Vestibulum ut neque pharetra, tincidunt nisl eget, venenatis magna. Sed at tristique dolor. Sed volutpat sodales sapien, vel scelerisque mauris suscipit eu. Nulla vestibulum orci eu mauris interdum, et malesuada libero imperdiet. Fusce fermentum magna sit amet dolor pharetra varius. Aliquam erat volutpat. Integer porta arcu non metus malesuada gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse ultricies, nulla eget laoreet tincidunt, eros neque suscipit dolor, sed viverra est erat ac odio. Phasellus ut urna ac purus vestibulum tristique vel ac lectus. In gravida sapien ac diam tristique dapibus. Donec fermentum diam vel suscipit pretium. Quisque venenatis nunc vel odio aliquet, eu convallis purus fermentum. Ut ac nunc nec eros blandit euismod. Nulla vestibulum orci ut lectus dapibus, eu efficitur magna dictum. Vestibulum molestie libero id mauris sagittis dapibus. Duis eget varius arcu, ut vehicula felis. Aenean vestibulum vel sapien non tincidunt. Integer imperdiet felis nec nulla aliquet, at tincidunt nunc volutpat. Ut aliquet nulla id orci consectetur varius. Curabitur malesuada, ligula id scelerisque imperdiet, risus nisl feugiat arcu, nec ultricies elit felis sed lacus. Morbi sed orci ac felis gravida tincidunt non et risus. Quisque id erat a nulla suscipit suscipit. Nulla at dolor tincidunt, consequat eros a, malesuada est. Duis eget leo quam. Suspendisse potenti. Sed dapibus dui ut arcu tristique dapibus. Fusce vitae ligula non sem tincidunt consequat ut nec urna. Morbi id convallis purus. Suspendisse interdum erat in scelerisque laoreet. Integer pharetra libero vitae felis facilisis, et fermentum nisl convallis. Duis in augue nec libero pellentesque facilisis ac eu elit. Donec dapibus nulla ut arcu mollis, eget suscipit odio varius. In einer Gummibärchenpackung gibt es ingesamt 256 Gummibärchen. Diese sollen jetzt auf Tom, Alice, Jonas, Friedrich, Tabea, Michi, Lisa und Felix aufgeteilt werden.",
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
