import GroupSetServiceEmits from "../api/group-set/interfaces/GroupSetServiceEmits";

/**
 * all interfaces specifying server to client events (Emit-Interfaces) must be registered here
 */
type ServerToClientEvents = GroupSetServiceEmits; // & TestServiceEmits

export default ServerToClientEvents;
