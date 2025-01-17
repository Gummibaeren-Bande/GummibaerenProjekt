import CallbackSuccessDTO from "./CallbackSuccessDTO";
import GroupSetDTO from "../GroupSetDTO";
class CallbackGroupSetDTO extends CallbackSuccessDTO {
  readonly state: GroupSetDTO;
  constructor(success: boolean, message: string, state: GroupSetDTO) {
    super(success, message);
    this.state = state;
  }
}
export default CallbackGroupSetDTO;
