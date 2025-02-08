// entry point of the shared-backend

import express from "express";
import { createServer, get } from "http";
import { Server } from "socket.io";
import welcomeHandler from "./api/welcome/welcomeHandler";
import groupSetHandler from "./api/group-set/groupSetHandler";
import IoServer from "./types/IoServer";
import IoSocket from "./types/IoSocket";
import { InterServerEvents, SocketData } from "./types/IoInterfaces";
import ClientToServerEvents from "./types/ClientToServerEvents";
import ServerToClientEvents from "./types/ServerToClientEvents";
import GroupSetService from "./api/group-set/GroupSetService";
import TaskService from "./api/task/TaskService";
import GroupProgressService from "./api/group-progress/GroupProgressService";
import ExerciseService from "./api/exercise/ExerciseService";
import TrackableTaskService from "./api/trackableTask/TrackableTaskService";
import GroupService from "./api/group/GroupService";
import taskList from "./taskList";
import groupProgressHandler from "./api/group-progress/groupProgressHandler";
import trackableTaskHandler from "./api/trackableTask/trackableTaskHandler";
import taskHandler from "./api/task/taskHandler";
import exerciseHandler from "./api/exercise/exerciseHandler";
import readline from "readline";
import WelcomeService from "./api/welcome/WelcomeService";
import TeacherEmitsService from "./api/teacher-emits/TeacherEmitsService";
import fs from "fs";
import dgram from "dgram";

// set up ip of active port for testing purposes

let ip = await (async () => {
  return await getActiveInterfaceIp();
})();

// save server ip to env file
console.log(`server ip: ${ip}`);
fs.writeFileSync(
  "../students-frontend/server.env",
  `VITE_SERVER_URL=http://${ip}:3000/students\n`,
);
fs.writeFileSync(
  "../teachers-frontend/server.env",
  `VITE_SERVER_URL=http://${ip}:3000/teachers\n`,
);

async function getActiveInterfaceIp(): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create a dummy socket to determine the active network interface
    const socket = dgram.createSocket("udp4");
    socket.connect(80, "8.8.8.8", () => {
      const address = socket.address();
      const ip = typeof address === "string" ? address : address.address;
      socket.close();
      resolve(ip);
    });
    socket.on("error", (err) => {
      socket.close();
      reject(err);
    });
  });
}

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
    origin: [
      "http://localhost:8080",
      "http://localhost:8081",
      `http://${ip}:8080`,
      `http://${ip}:8081`,
    ], // specify who can access this backend
  },
});

// initialize all services
const taskService = new TaskService();
const teacherEmitsService = new TeacherEmitsService();
const groupSetService = new GroupSetService(taskService, teacherEmitsService);
const groupService = new GroupService(groupSetService);
const groupProgressService = new GroupProgressService(groupService);
const trackableTaskService = new TrackableTaskService(groupProgressService);
const exerciseService = new ExerciseService(trackableTaskService);
const welcomeService = new WelcomeService(groupService, teacherEmitsService);

// upload dummy task set
taskService.uploadTaskSet(taskList);
console.log("task set uploaded");

// define namespaces
const studentsServer = io.of("/students");
const teachersServer = io.of("/teachers");

// define students server
const onStudentConnection = (socket: IoSocket) => {
  // add all handler functions for students here
  welcomeHandler(io, socket, welcomeService, false);
  taskHandler(io, socket, taskService);
  groupSetHandler(io, socket, groupSetService);
  groupProgressHandler(io, socket, groupProgressService);
  trackableTaskHandler(io, socket, trackableTaskService);
  exerciseHandler(io, socket, exerciseService);
};

// serve the handler functions for students when connected
studentsServer.on("connection", onStudentConnection);

// define teachers server
const onTeachersConnection = (socket: IoSocket) => {
  // add all handler functions for students here
  welcomeHandler(io, socket, welcomeService, true);
  taskHandler(io, socket, taskService);
  groupSetHandler(io, socket, groupSetService);
  groupProgressHandler(io, socket, groupProgressService);
  trackableTaskHandler(io, socket, trackableTaskService);
  exerciseHandler(io, socket, exerciseService);
};

// serve the handler functions for teachers when connected
teachersServer.on("connection", onTeachersConnection);

// server port is 3000
httpServer.listen(3000);
console.log("server running at http://localhost:3000");
console.log("type 'quit' or 'q' to stop the server");
// open a scanner to listen to the console
const scanner = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// close the server when the scanner reads quit
scanner.on("line", (line: string) => {
  if (line === "quit" || line === "q") {
    httpServer.close();
    process.exit();
  }
});
