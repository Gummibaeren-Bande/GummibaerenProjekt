import CallbackSuccessDTO from "../../dtos/CallbackDTOs/CallbackSuccessDTO";

// Definition of the callback type that is used to handle the success of an operation
type CallbackSuccess = (response: CallbackSuccessDTO) => void;

export default CallbackSuccess;
