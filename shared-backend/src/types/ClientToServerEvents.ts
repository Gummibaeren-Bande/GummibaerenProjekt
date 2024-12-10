import GroupServiceListeners from "../handlers/group-handler/interfaces/GroupServiceListeners"

/**
 * all interfaces specifying client to server events (Listener-Interfaces) must be registered here
 */
type ClientToServerEvents = GroupServiceListeners // & TestServiceListeners

export default ClientToServerEvents