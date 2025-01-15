import Exercise from "../abstract-classes/Exercise";
import MultipleChoiceExercise from "../entities/MultipleChoiceExercise";

class ExerciseDTO {
  id: string;
  title: string;
  description: string;
  question: string;
  type: "multiple-choice" | "numerical";
  options: string[] | undefined;

  constructor(exercise: Exercise) {
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
