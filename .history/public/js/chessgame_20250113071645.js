const socket = io();

socket.emit("churan");
socket.on("churan papdi", function () {
  alert("churan paapdi received");
});
