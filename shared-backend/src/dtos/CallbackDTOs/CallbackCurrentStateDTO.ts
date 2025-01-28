import CallbackSuccessDTO from "./CallbackSuccessDTO";
import CurrentStateDTO from "../CurrentStateDTO";
class CallbackCurrentStateDTO extends CallbackSuccessDTO {
  readonly state: CurrentStateDTO;
  constructor(success: boolean, message: string, state: CurrentStateDTO) {
    super(success, message);
    this.state = state;
  }
}
export default CallbackCurrentStateDTO;
