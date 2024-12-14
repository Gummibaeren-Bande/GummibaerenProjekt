// Exercise interface

export default interface Exercise {
  id: string;
  description: string;
  question: string;
  type: "multiple-choice" | "numerical";
}
