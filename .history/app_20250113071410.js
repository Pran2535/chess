const express = require("express");
const socket = require("socket.io");
const http = require("http");

const path = require("path");

const { Chess } = require("chess.js");
const { title } = require("process");

const app = express(); /// app ek instance hai jo ki hamne banaiya hai express ko call kar ke

const server = http.createServer(app); // server banane ke liye hamne http.createserver method ke ander hamne express ke instance ko pass kar diya hai and then sare setup ho gai

const io = socket(server);

const chess = new Chess();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index", { title: "chess game " });
});
io.on("connection", function (uniqueSocket) {
  console.log("connected");
  uniqueSocket.on("churan", function () {
    io.emit("churan papdi");
  });
});
server.listen(3000, () => {
  console.log("server is listening on port 3000");
});
