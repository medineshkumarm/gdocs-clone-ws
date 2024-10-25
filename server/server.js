const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error:", err));

// Socket.io events for real-time chat
io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send-message", ({ roomId, content }) => {
    socket.to(roomId).emit("receive-message", { content });
  });
});

server.listen(3001, () => console.log("Server running on port 3001"));
