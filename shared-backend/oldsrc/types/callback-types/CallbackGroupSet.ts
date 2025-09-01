import CallbackCurrentStateDTO from "../../dtos/CallbackDTOs/CallbackCurrentStateDTO";

// Definition of the callback type that is used to get the current state of the group set
type CallbackGroupSet = (response: CallbackCurrentStateDTO) => void;

export default CallbackGroupSet;
