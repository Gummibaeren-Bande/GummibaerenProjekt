import IoServer from "../../types/IoServer";
import IoSocket from "../../types/IoSocket";
import userConnected from "./services/userConnected";
import userDisonnected from "./services/userDisconnected";


/**
 * the welcome handler handles all connection and disconnection events of clients
 * 
 * @param io the static server
 * @param socket the dynamic socket dependet on the current connection
 */
function welcomeHandler(io: IoServer, socket: IoSocket) {
    
    userConnected()

    socket.on("disconnect", userDisonnected);
}

export default welcomeHandler
