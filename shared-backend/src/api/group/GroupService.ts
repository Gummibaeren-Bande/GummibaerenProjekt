import Group from "../../entities/Group";
import GroupCollectionService from "../group-collection/GroupCollectionService";

class GroupService {
  private readonly groupCollectionService: GroupCollectionService;

  constructor(groupCollectionService: GroupCollectionService) {
    this.groupCollectionService = groupCollectionService;
    console.log("Group service was successfully started");
  }

  public getGroupByName(name: string): Group {
    return this.groupCollectionService
      .getGroupCollection()
      .getGroupByName(name);
  }
}

export default GroupService;
