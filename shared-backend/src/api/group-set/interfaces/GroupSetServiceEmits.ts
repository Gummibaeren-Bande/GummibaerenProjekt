import GroupSet from "../../../entities/GroupSet";

interface GroupSetServiceEmits {
  getGroupSet: (groupSet: GroupSet) => void;
}

export default GroupSetServiceEmits;
