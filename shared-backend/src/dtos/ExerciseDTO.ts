import Exercise from "../abstract-classes/Exercise";

// a dto to transfer an exercise
class ExerciseDTO {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly question: string;
  public readonly type: "multiple-choice" | "numerical";

  constructor(exercise: Exercise) {
    this.id = exercise.getId();
    this.title = exercise.getTitle();
    this.description = exercise.getDescription();
    this.question = exercise.getQuestion();
    this.type = exercise.getType();
  }
}

export default ExerciseDTO;
