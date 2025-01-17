import CallbackDTO from "../../dtos/CallbackDTO";

// Definition of the callback type that is used to handle the success of an operation
type CallbackSuccess = (response: CallbackDTO) => void;

export default CallbackSuccess;
