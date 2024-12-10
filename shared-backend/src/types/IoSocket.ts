import { Socket } from "socket.io";
import ClientToServerEvents from "./ClientToServerEvents";
import ServerToClientEvents from "./ServerToClientEvents";

/**
 * type declaration of the socketIO socket type
 */
type IoSocket = Socket<ClientToServerEvents, ServerToClientEvents> // Note: reverese the generics ClientToServerEvents, ServerToClientEvents on client side

export default IoSocket