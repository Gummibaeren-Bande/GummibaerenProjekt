import CallbackSuccess from "../../../types/callback-types/CallbackSuccess";

interface GroupCollectionServiceListeners {
  addGroup: (name: string, callback: CallbackSuccess) => void;
}

export default GroupCollectionServiceListeners;
