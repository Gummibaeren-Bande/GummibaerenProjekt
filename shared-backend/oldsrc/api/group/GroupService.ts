import Group from "../../entities/Group";
import IoSocket from "../../types/IoSocket";
import GroupSetService from "../group-set/GroupSetService";

class GroupService {
  private readonly groupSetService: GroupSetService;

  constructor(groupSetService: GroupSetService) {
    this.groupSetService = groupSetService;
    console.log("Group service was successfully started");
  }

  public getGroupByName(name: string): Group | undefined {
    return this.groupSetService.getGroupSet().getGroupByName(name);
  }

  /**
   * finds the group with the given socket attached. after the group is found, the attached socket is unassigned.
   *
   * @param socket the given socket
   */
  public unassignSocketFromGroup(socket: IoSocket): void {
    const group = this.groupSetService.getGroupSet().tryGroupBySocket(socket);
    if (group) {
      group.unassignSocket();
    }
  }
}

export default GroupService;
