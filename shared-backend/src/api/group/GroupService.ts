import Group from "../../entities/Group";
import GroupSetService from "../group-set/GroupSetService";

class GroupService {
  private readonly groupCollectionService: GroupSetService;

  constructor(groupCollectionService: GroupSetService) {
    this.groupCollectionService = groupCollectionService;
    console.log("Group service was successfully started");
  }

  public getGroupByName(name: string): Group {
    return this.groupCollectionService.getGroupSet().getGroupByName(name);
  }
}

export default GroupService;
