import GroupCollectionServiceListeners from "../api/group-collection/interfaces/GroupCollectionServiceListeners";

/**
 * all interfaces specifying client to server events (Listener-Interfaces) must be registered here
 */
type ClientToServerEvents = GroupCollectionServiceListeners; // & TestServiceListeners

export default ClientToServerEvents;
