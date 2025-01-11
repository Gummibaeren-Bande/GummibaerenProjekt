import Group from "../../entities/Group";
import GroupSetService from "../group-set/GroupSetService";

class GroupService {
  private readonly groupSetService: GroupSetService;

  constructor(groupSetService: GroupSetService) {
    this.groupSetService = groupSetService;
    console.log("Group service was successfully started");
  }

  public getGroupByName(name: string): Group {
    return this.groupSetService.getGroupSet().getGroupByName(name);
  }
}

export default GroupService;
