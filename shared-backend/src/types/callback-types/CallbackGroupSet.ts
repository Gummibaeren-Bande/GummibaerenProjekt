import CallbackGroupSetDTO from "../../dtos/CallbackDTOs/CallbackGroupSetDTO";

// Definition of the callback type that is used to get the current state of the group set
type CallbackGroupSet = (response: CallbackGroupSetDTO) => void;

export default CallbackGroupSet;
