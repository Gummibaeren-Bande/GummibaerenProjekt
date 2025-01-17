import GroupSetDTO from "../../dtos/GroupSetDTO";

// Definition of the callback type that is used to get the current state of the group set
type CallbackGroupSet = (message: { state: GroupSetDTO }) => void;

export default CallbackGroupSet;
