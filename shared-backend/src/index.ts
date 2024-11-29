import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173"
    }
  });

io.on("connection", (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('add-team', (name) => {
      console.log(`ein Team mit dem Name ${name} wurde erstellt`); 
    })
});

httpServer.listen(3000);
console.log('server running at http://localhost:3000');