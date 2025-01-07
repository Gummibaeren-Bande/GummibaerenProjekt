import MultipleChoiceExercise from "../entities/MultipleChoiceExercise";
import NumericalExercise from "../entities/NumericalExercise";
import Answer from "../types/Answer";

describe("MultipleChoiceExercise", () => {
  let exercise: MultipleChoiceExercise;

  beforeEach(() => {
    exercise = new MultipleChoiceExercise(
      "Sample Title",
      "Sample Description",
      "Sample Question",
      ["Option 1", "Option 2", "Option 3"],
      [0, 2],
    );
  });

  it("should return true for correct answers", () => {
    const answer: Answer = [0, 2];
    expect(exercise.checkAnswer(answer)).toBe(true);
  });

  it("should return false for incorrect answers", () => {
    const answer: Answer = [1, 2];
    expect(exercise.checkAnswer(answer)).toBe(false);
  });

  it("should throw an error for non-array answers", () => {
    const answer: Answer = 1;
    expect(() => exercise.checkAnswer(answer)).toThrow(
      "Answer must be an array of indexes",
    );
  });

  it("should return the correct options", () => {
    expect(exercise.getOptions()).toEqual(["Option 1", "Option 2", "Option 3"]);
  });

  it("should return the correct option indexes", () => {
    expect(exercise.getCorrectOptionIndexes()).toEqual([0, 2]);
  });
});

describe("NumericalExercise", () => {
  let exercise: NumericalExercise;

  beforeEach(() => {
    exercise = new NumericalExercise(
      "Sample Title",
      "Sample Description",
      "Sample Question",
      42,
    );
  });

  it("should return true for the correct answer", () => {
    const answer: Answer = 42;
    expect(exercise.checkAnswer(answer)).toBe(true);
  });

  it("should return false for an incorrect answer", () => {
    const answer: Answer = 43;
    expect(exercise.checkAnswer(answer)).toBe(false);
  });

  it("should throw an error for non-number answers", () => {
    const answer: Answer = [42];
    expect(() => exercise.checkAnswer(answer)).toThrow(
      "The answer must be a number",
    );
  });
});
