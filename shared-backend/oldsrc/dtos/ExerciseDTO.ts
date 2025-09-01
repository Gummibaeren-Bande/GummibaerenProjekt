import Exercise from "../entities/abstract/Exercise";
import MultipleChoiceExercise from "../entities/MultipleChoiceExercise";

// a data transferable object to transfer an exercise
class ExerciseDTO {
  // initialized with "A", "B", "C", ...
  public readonly enumerator: string;
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly question: string;
  public readonly type: "multiple-choice" | "numerical";
  public readonly options: string[] | undefined;

  constructor(exercise: Exercise, enumerator?: string) {
    this.enumerator = enumerator ?? "";
    this.id = exercise.getId();
    this.title = exercise.getTitle();
    this.description = exercise.getDescription();
    this.question = exercise.getQuestion();
    this.type = exercise.getType();
    if (this.type === "multiple-choice") {
      this.options = (exercise as MultipleChoiceExercise).getOptions();
    }
  }
}

export default ExerciseDTO;
