import IoSocket from "../types/IoSocket";
import GroupProgress from "./GroupProgress";
import TaskSet from "./TaskSet";

/**
 * This class represents a group in the database.
 */
class Group {
  private readonly name: string;
  private readonly groupProgress: GroupProgress;
  private assignedSocket: IoSocket | null;

  constructor(name: string, socket: IoSocket, taskSet: TaskSet) {
    this.name = name;
    this.assignedSocket = socket;
    this.groupProgress = new GroupProgress(taskSet);
  }

  public getName() {
    return this.name;
  }

  public getGroupProgress(): GroupProgress {
    return this.groupProgress;
  }

  public getAssignedSocketId(): string | null {
    return this.assignedSocket ? this.assignedSocket.id : null;
  }

  /**
   * set the assigned socket to null
   */
  public deassignSocket(): void {
    this.assignedSocket = null;
  }

  /**
   * tests if the group has a assigned socket
   * @returns true if so
   */
  public hasAssignedSocket() {
    return this.assignedSocket !== null;
  }

  public setAssignedSocket(socket: IoSocket) {
    if (this.assignedSocket) {
      throw new Error(`Socket for group ${this.name} is already assigned!`);
    }
    this.assignedSocket = socket;
  }
}

export default Group;
