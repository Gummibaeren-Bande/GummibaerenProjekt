import GroupCollectionServiceEmits from "../api/group-collection/interfaces/GroupCollectionServiceEmits";

/**
 * all interfaces specifying server to client events (Emit-Interfaces) must be registered here
 */
type ServerToClientEvents = GroupCollectionServiceEmits; // & TestServiceEmits

export default ServerToClientEvents;
