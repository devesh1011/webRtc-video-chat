const socket = io();

// let createForm = document.getElementById("create-form");
let joinForm = document.getElementById("join-form");

document.addEventListener("DOMContentLoaded", () => {
  // createForm.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   let inviteCode = e.target.invite_link.value;
  //   socket.emit("create-room", inviteCode);
  //   window.location = `/room?roomId=${inviteCode}`;
  // });

  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let join_link = e.target.join_link.value;
    e.target.join_link.value = "";
    socket.emit("join-room", join_link);
    window.location = `/room?roomId=${join_link}`;
  });
});
