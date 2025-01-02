// Definition of the callback type that is used to handle the success of an operation
type CallbackSuccess = (response: {
  success: boolean;
  message: string;
}) => void;

export default CallbackSuccess;
