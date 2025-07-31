import { v4 as uuidv4 } from "uuid";
import Session from "./Session";
import ObservableEntity from "../data/exercise/abstract/ObservableEntity";
import EntityObserver from "../../api/group-set/interfaces/EntityObserver";
import TaskSet from "../data/TaskSet";
class SessionManager extends ObservableEntity {
  private sessions: Map<string, Session>;
  private taskSetList: Map<string, TaskSet>;

  constructor(subscriber: EntityObserver) {
    super(subscriber);
    this.sessions = new Map<string, Session>();
    this.taskSetList = new Map<string, TaskSet>();
  }

  public createNewSession(taskSet: TaskSet): string {
    const sessionId = uuidv4();
    const newSession = new Session(this.subscriber, sessionId, taskSet);
    this.sessions.set(sessionId, newSession);
    this.notifySubscriber();
    return sessionId;
  }

  public getSessionById(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  public getAllSessions(): Session[] {
    return Array.from(this.sessions.values());
  }

  public deleteSession(sessionId: string): boolean {
    if (this.sessions.has(sessionId)) {
      this.sessions.delete(sessionId);
      this.notifySubscriber();
      return true;
    }
    return false;
  }

  public loadTaskSet(taskSet: TaskSet): void {
    this.taskSetList.set(uuidv4(), taskSet);
    this.notifySubscriber();
  }

  public getAllTaskSets(): TaskSet[] {
    return Array.from(this.taskSetList.values());
  }
}
export default SessionManager;
