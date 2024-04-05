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

document.addEventListener("DOMContentLoaded", () => {
  getUserMedia(constraints);
});

const getUserMedia = async (constraints) => {
  localStream = await navigator.mediaDevices.getUserMedia(constraints);
  user1.srcObject = localStream;
};
