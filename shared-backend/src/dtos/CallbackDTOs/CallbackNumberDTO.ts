import CallbackSuccessDTO from "./CallbackSuccessDTO";

class CallbackNumberDTO extends CallbackSuccessDTO {
  readonly number: number;
  constructor(success: boolean, message: string, number: number) {
    super(success, message);
    this.number = number;
  }
}

export default CallbackNumberDTO;
