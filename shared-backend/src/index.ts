// entry point of the shared-backend

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import welcomeHandler from "./api/welcome/welcomeHandler";
import groupSetHandler from "./api/group-set/groupSetHandler";
import IoServer from "./types/IoServer";
import IoSocket from "./types/IoSocket";
import ClientToServerEvents from "./types/ClientToServerEvents";
import ServerToClientEvents from "./types/ServerToClientEvents";
import GroupSetService from "./api/group-set/GroupSetService";
import TaskService from "./api/task/TaskService";
import GroupProgressService from "./api/group-progress/GroupProgressService";
import ExcerciseService from "./api/exercicse/ExerciseService";
import TrackableTaskService from "./api/trackableTask/TrackableTaskService";
import GroupService from "./api/group/GroupService";

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

// initialize all services
const taskService = new TaskService();
const groupSetService = new GroupSetService(taskService);
const groupService = new GroupService(groupSetService);
const groupProgressService = new GroupProgressService(groupService);
const trackableTaskService = new TrackableTaskService(groupProgressService);
const excerciseService = new ExcerciseService(trackableTaskService);

// upload dummy task set
taskService.uploadTaskSet([
  /*TODO: create hardcoded task list to upload*/
]);

const onConnection = (socket: IoSocket) => {
  // add all handler functions here
  welcomeHandler(io, socket);
  groupSetHandler(io, socket, groupSetService);
};

// serve the handler functions when connected
io.on("connection", onConnection);

// server port is 3000
httpServer.listen(3000);
console.log("server running at http://localhost:3000");
