import CallbackNumberDTO from "../../dtos/CallbackDTOs/CallbackNumberDTO";

// Definition of the callback type that is used to handle a number
type CallbackNumber = (response: CallbackNumberDTO) => void;

export default CallbackNumber;
