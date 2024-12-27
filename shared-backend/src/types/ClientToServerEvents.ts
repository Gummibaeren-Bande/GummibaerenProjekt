import GroupSetServiceListeners from "../api/group-set/interfaces/GroupSetServiceListeners";

/**
 * all interfaces specifying client to server events (Listener-Interfaces) must be registered here
 */
type ClientToServerEvents = GroupSetServiceListeners; // & TestServiceListeners

export default ClientToServerEvents;
