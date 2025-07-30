import EntityObserver from "../api/group-set/interfaces/EntityObserver";
import IoSocket from "../types/IoSocket";
import Group from "./Group";
import TaskSet from "./TaskSet";
import ObservableEntity from "./abstract/ObservableEntity";

/**
 * This class represents the set of groups in the database.
 */
class GroupSet extends ObservableEntity {
  private readonly groupList: Group[];

  constructor(subscriber: EntityObserver) {
    super(subscriber);
    this.groupList = [];
  }

  /**
   * tries to create and add a group with the given name if the name is not yet used by another group,
   * assigns the given socket to the group
   *
   * @param groupToAdd the name of the new group to add
   * @returns true if the operation was successful and false otherwise
   */
  public addNewGroup(
    name: string,
    socket: IoSocket,
    taskSet: TaskSet,
  ): boolean {
    if (this.groupList.some((el) => name === el.getName())) {
      // group with the same name already exists
      return false;
    }
    this.groupList.push(new Group(name, socket, taskSet, this.subscriber));
    this.notifySubscriber();
    return true;
  }

  public getGroupByName(name: string): Group | undefined {
    const group = this.groupList.find((el) => name === el.getName());
    return group;
  }

  /**
   * tries to return the group with the given socket assigned.
   *
   * @param socket the assigned socket to search for
   * @returns the Group or undefined if no Group matches the search criteria
   */
  public tryGroupBySocket(socket: IoSocket): Group | undefined {
    const group = this.groupList.find(
      (el) => socket.id === el.getAssignedSocketId(),
    );
    return group;
  }

  public getGroupList() {
    return this.groupList;
  }
}

export default GroupSet;
