import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4001",
    methods: ["GET", "POST"],
  },
});

// Encapsulating users object within a function
const users = {};
export const getReceiverId = (recieverId) => {
  return users[recieverId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Connected users:", users);
  }

  io.emit("getOnline", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    delete users[userId];
    io.emit("getOnline", Object.keys(users));
  });
});

export { app, io, server };
