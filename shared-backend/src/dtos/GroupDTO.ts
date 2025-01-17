import Group from "../entities/Group";
import GroupProgressDTO from "./GroupProgressDTO";

// a dto to transfer a group
class GroupDTO {
  public readonly name: string;
  public readonly groupProgress: GroupProgressDTO;

  constructor(group: Group) {
    this.name = group.getName();
    this.groupProgress = new GroupProgressDTO(group.getGroupProgress());
  }
}

export default GroupDTO;
