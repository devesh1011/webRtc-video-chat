const socket = io();

let rtcPeerConnection;
let localStream;
let remoteStream;
let creator;
let user1 = document.getElementById("user-1");
let user2 = document.getElementById("user-2");
const lobbyContainer = document.getElementById("lobby-container");
const videoContainer = document.getElementById("video-container");
const roomInput = document.getElementById("join_link");

const peerConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
    },
  ],
};

const constraints = {
  video: {
    width: { min: 640, ideal: 1920, max: 1920 },
    height: { min: 480, ideal: 1080, max: 1080 },
  },
  // audio: true,
};

// Function to initialize socket events
const initSocketEvents = () => {
  socket.on("room-created", handleRoomCreated);
  socket.on("room-joined", handleRoomJoined);
  socket.on("room-full", handleRoomFull);
  socket.on("ready", handleReady);
  socket.on("candidates", handleCandidates);
  socket.on("offer", handleCreateOffer);
  socket.on("create-answer", handleCreateAnswer);
};

// Function to handle room created event
const handleRoomCreated = () => {
  creator = true;
  getUserMedia(constraints);
};

// Function to handle room joined event
const handleRoomJoined = async () => {
  creator = false;
  getUserMedia(constraints);
};

// Function to handle room full event
const handleRoomFull = () => {
  alert("Room is full right now");
};

// Function to handle ready event
const handleReady = () => {};

// Function to handle candidates event
const handleCandidates = () => {
  // Placeholder for handling "candidates" event
};

// Function to handle create offer event
const handleCreateOffer = (offer) => {};

// Function to handle create answer event
const handleCreateAnswer = () => {
  // Placeholder for handling "create-answer" event
};

// Function to initialize event listeners
const initEventListeners = () => {
  document.getElementById("join").addEventListener("click", handleJoinRoom);
};

// Function to handle join room button click
const handleJoinRoom = (e) => {
  e.preventDefault();
  let roomId = roomInput.value;

  if (roomId === "") {
    alert("Room ID cannot be empty");
    return;
  }

  lobbyContainer.style.display = "none";
  videoContainer.style.display = "block";

  socket.emit("join-room", roomId);
};

// Function to get user media
const getUserMedia = async (constraints) => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    user1.srcObject = localStream;
    socket.emit("ready", roomInput.value);
  } catch (error) {
    console.error("Error getting user media:", error);
  }
};

// Initialize socket events and event listeners
const init = () => {
  initSocketEvents();
  initEventListeners();
};

// Call the init function to initialize everything
init();
