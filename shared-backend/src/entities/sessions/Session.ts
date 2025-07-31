import TaskSet from "../data/TaskSet";
import Group from "../groups/Group";
import ObservableEntity from "../data/exercise/abstract/ObservableEntity";
import EntityObserver from "../../api/group-set/interfaces/EntityObserver";
import IoSocket from "../../types/IoSocket";

class Session extends ObservableEntity {
  private readonly sessionId: string;
  private taskSet: TaskSet;
  private groupList: Group[];
  constructor(subscriber: EntityObserver, sessionId: string, taskSet: TaskSet) {
    super(subscriber);
    this.sessionId = sessionId;
    this.groupList = [];
    this.taskSet = taskSet;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public getTaskSet(): TaskSet {
    return this.taskSet;
  }

  public setTaskSet(taskSet: TaskSet): void {
    this.taskSet = taskSet;
  }

  public getGroupList(): Group[] {
    return this.groupList;
  }

  public addNewGroup(name: string, socket: IoSocket): boolean {
    if (this.groupList.some((el) => name === el.getName())) {
      // group with the same name already exists
      return false;
    }
    this.groupList.push(new Group(name, socket, this.taskSet, this.subscriber));
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
      (el) => socket.id === el.getAssignedSocketId()
    );
    return group;
  }
}
export default Session;
