import Group from "./Group";

class GroupCollection {
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
  public addNewGroup(name: string): boolean {
    if (this.groupList.some((el) => name === el.getName())) {
      // group with the same name already exists
      return false;
    }
    this.groupList.push(new Group(name));
    return true;
  }
}

export default GroupCollection;
