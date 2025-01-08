import { Server } from "socket.io";
import ClientToServerEvents from "./ClientToServerEvents";
import ServerToClientEvents from "./ServerToClientEvents";

/**
 * type declaration of the socketIO server type
 */
type IoServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export default IoServer;
