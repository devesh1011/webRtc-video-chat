const socket = io();

let localStream;
let user1 = document.getElementById("user-1");
let user2 = document.getElementById("user-2");

let constraints = {
  video: {
    width: { min: 640, ideal: 1920, max: 1920 },
    height: { min: 480, ideal: 1080, max: 1080 },
  },
  // audio: true,
};

const lobbyContainer = document.getElementById("lobby-container");
const videoContainer = document.getElementById("video-container");

document.addEventListener("DOMContentLoaded", () => {
  let joinButton = document.getElementById("join");
  const roomId = document.getElementById("join_link");

  joinButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (roomId.value === "") {
      alert("room cannot be null");
    }
    roomId.value = "";
    lobbyContainer.style = "display: none";
    videoContainer.style = "display: block";

    socket.emit("join-room", roomId.value);

    getUserMedia(constraints);
  });
});

const getUserMedia = async (constraints) => {
  localStream = await navigator.mediaDevices.getUserMedia(constraints);
  user1.srcObject = localStream;
};
