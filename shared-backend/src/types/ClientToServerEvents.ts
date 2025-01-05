import ExerciseServiceListener from "../api/exercicse/interfaces/ExerciseServiceListener";
import GroupProgressServiceListener from "../api/group-progress/interfaces/GroupProgressServiceListener";
import GroupSetServiceListeners from "../api/group-set/interfaces/GroupSetServiceListeners";
import TaskServiceListener from "../api/task/interfaces/TaskServiceListener";
import TrackableTaskServiceListener from "../api/trackableTask/interfaces/TrackableTaskServiceListener";

/**
 * all interfaces specifying client to server events (Listener-Interfaces) must be registered here
 */
type ClientToServerEvents = GroupSetServiceListeners &
  TrackableTaskServiceListener &
  TaskServiceListener &
  GroupProgressServiceListener &
  ExerciseServiceListener;

export default ClientToServerEvents;
