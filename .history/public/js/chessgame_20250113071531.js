const socket = io();

socket.emit("churan");
socket.on("churan paapdi", function () {
  alert("churan paapdi received");
});
