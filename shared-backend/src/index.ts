// entry point of the shared-backend

import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import welcomeHandler from "./handlers/welcome-handler/welcomeHandler";
import groupHandler from "./handlers/group-handler/groupHandler";
import IoServer from "./types/IoServer";
import IoSocket from "./types/IoSocket";
import ClientToServerEvents from "./types/ClientToServerEvents";
import ServerToClientEvents from "./types/ServerToClientEvents";
import GroupService from "./handlers/group-handler/GroupService";

// scaffold new server
const app = express();
const httpServer = createServer(app);
const io: IoServer = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: ["http://localhost:8080", "http://localhost:8081"], // specify who can access this backend
  },
});

const onConnection = (socket: IoSocket) => {
  // add all handler functions here
  welcomeHandler(io, socket);
  groupHandler(io, socket);
};

// serve the handler functions when connected
io.on("connection", onConnection);

// server port is 3000
httpServer.listen(3000);
console.log("server running at http://localhost:3000");
