import GroupSet from "../entities/GroupSet";
import GroupDTO from "./GroupDTO";

// a dto to transfer an group set
class GroupSetDTO {
  public readonly groups: GroupDTO[];

  constructor(groupSet: GroupSet) {
    this.groups = groupSet.getGroupList().map((group) => new GroupDTO(group));
  }
}

export default GroupSetDTO;
