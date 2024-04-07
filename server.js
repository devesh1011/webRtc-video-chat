const bodyParser = require("body-parser");
const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

// Set view engine and static folder
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render index.ejs
app.get("/", (req, res) => {
  res.render("index.ejs");
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("join-room", (roomId) => {
    const rooms = io.sockets.adapter.rooms;

    const room = rooms.get(roomId);

    if (!room) {
      socket.join(roomId);
      socket.emit("room-created");
    } else if (room.size === 1) {
      socket.join(roomId);
      socket.emit("room-joined");
    } else {
      console.log("room is full now");
      socket.emit("room-full");
    }
  });

  socket.on("ready", (roomId) => {
    console.log("ready");
    socket.broadcast.to(roomId).emit("ready");
  });

  socket.on("candidates", (candidate, roomId) => {
    console.log("candidate");
    socket.broadcast.to(roomId).emit("candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("offer", (offer, roomId) => {
    console.log("called offer event");
  });

  socket.on("create-answer", (answer, roomId) => {
    console.log("offer");
    socket.broadcast.to(roomId).emit("answer", answer);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
