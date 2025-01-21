// entry point of the shared-backend

import express from "express";
import { createServer, get } from "http";
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
import taskList from "./taskList";
import groupProgressHandler from "./api/group-progress/groupProgressHandler";
import trackableTaskHandler from "./api/trackableTask/trackableTaskHandler";
import taskHandler from "./api/task/taskHandler";
import exerciseHandler from "./api/exercicse/exerciseHandler";
import readline from "readline";
import WelcomeService from "./api/welcome/WelcomeService";
import TeacherEmitsService from "./api/teacher-emits/TeacherEmitsService";
import fs from "fs";
import os from "os";

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
    origin: "*", // specify who can access this backend
  },
});

// save server ip to env file
const ip = getIpAdress();
console.log(`server ip: ${ip}`);
fs.writeFileSync(
  "../students-frontend/server.env",
  `VITE_SERVER_URL=http://${ip}:3000/students\n`
);

// get the ip adress of the server
function getIpAdress(): string {
  const ifaces = os.networkInterfaces();
  let ip = "";
  for (const dev in ifaces) {
    ifaces[dev]?.forEach((details) => {
      if (details.family === "IPv4" && !details.internal) {
        ip = details.address;
      }
    });
  }
  return ip;
}

// initialize all services
const taskService = new TaskService();
const teacherEmitsService = new TeacherEmitsService();
const groupSetService = new GroupSetService(taskService, teacherEmitsService);
const groupService = new GroupService(groupSetService);
const groupProgressService = new GroupProgressService(groupService);
const trackableTaskService = new TrackableTaskService(groupProgressService);
const excerciseService = new ExcerciseService(trackableTaskService);
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
  exerciseHandler(io, socket, excerciseService);
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
  exerciseHandler(io, socket, excerciseService);
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
