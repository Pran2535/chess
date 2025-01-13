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
let players = {};
let currentPlayer = "W";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index", { title: "chess game " });
});
io.on("connection", function (uniqueSocket) {
  console.log("connected");
  if (!players.white) {
    players.white = uniqueSocket.id;
    uniqueSocket.emit("player role", "W"); // ye event abhi us bande ke liye hai jo ki player ka role dena padega and then all set
  } else if (!players.black) {
    players.black = uniqueSocket.id;
    uniqueSocket.emit("PlayerRole", "b");
  } else {
    uniqueSocket.emit("spectator role");
  }
  uniqueSocket.on("disconnect", function () {
    if (uniqueSocket.id === players.white) {
      delete players.white;
    } else if (uniqueSocket.id === players.black) {
      delete players.black;
    }
  });
  uniqueSocket.on("move", (move) => {
    try {
      if (chess.turn() === "W" && socket.id !== players.white) {
        return;
      }
      if (chess.turn() === "b" && socket.id !== players.black) return;
    } catch (err) {}
  });
});
server.listen(3000, () => {
  console.log("server is listening on port 3000");
});
