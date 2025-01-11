import Group from "./Group";
import TaskSet from "./TaskSet";

/**
 * This class represents the set of groups in the database.
 */
class GroupSet {
  private readonly groupList: Group[];

  constructor() {
    this.groupList = [];
  }

  /**
   * tries to create and add a group with the given name if the name is not yet used by another group
   *
   * @param groupToAdd the name of the new group to add
   * @returns true if the operation was successful and false otherwise
   */
  public addNewGroup(name: string, taskSet: TaskSet): boolean {
    if (this.groupList.some((el) => name === el.getName())) {
      // group with the same name already exists
      return false;
    }
    this.groupList.push(new Group(name, taskSet));
    return true;
  }

  public getGroupByName(name: string): Group {
    const group = this.groupList.find((el) => name === el.getName());
    if (!group) {
      throw new Error("No group with the given name found");
    }
    return group;
  }
}

export default GroupSet;
