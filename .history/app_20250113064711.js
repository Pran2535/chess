const express = require("express");
const socket = require("socket.io");
const http = require("http");

const { Chess } = require("chess.js");

const app = express(); /// app ek instance hai jo ki hamne banaiya hai express ko call kar ke

const server = http.createServer(app); // server banane ke liye hamne http.createserver method ke ander hamne express ke instance ko pass kar diya hai and then sare setup ho gai

const io = socket(server);
