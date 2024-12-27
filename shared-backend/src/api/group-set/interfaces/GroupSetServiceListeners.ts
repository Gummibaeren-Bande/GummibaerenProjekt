import CallbackSuccess from "../../../types/callback-types/CallbackSuccess";

interface GroupSetServiceListeners {
  addGroup: (name: string, callback: CallbackSuccess) => void;
}

export default GroupSetServiceListeners;
