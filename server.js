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
  res.render("lobby.ejs");
});

app.get("/room", (req, res) => {
  res.render("index.ejs");
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    const rooms = io.sockets.adapter.rooms;
    console.log(rooms);

    rooms.get(roomId) ? console.log("Room Found") : socket.join(roomId);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});