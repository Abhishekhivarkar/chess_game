const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let chess = new Chess();
const players = {};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", socket => {

  if (!players.w) {
    players.w = socket.id;
    socket.emit("playerRole", "w");
  } else if (!players.b) {
    players.b = socket.id;
    socket.emit("playerRole", "b");
  } else {
    socket.emit("spectator");
  }

  socket.emit("boardState", chess.fen());

  socket.on("move", move => {
    try {

      if (chess.turn() === "w" && socket.id !== players.w) return;
      if (chess.turn() === "b" && socket.id !== players.b) return;
      if (move.from === move.to) return;

      const result = chess.move(move);

      if (result) {
        io.emit("boardState", chess.fen());

        if (chess.isCheckmate()) {
          io.emit("gameOver", {
            type: "checkmate",
            winner: chess.turn() === "w" ? "Black" : "White"
          });
        } else if (chess.isDraw()) {
          io.emit("gameOver", { type: "draw" });
        }
      }

    } catch (err) {}
  });

  socket.on("resetGame", () => {
    chess = new Chess();
    io.emit("boardState", chess.fen());
  });

  socket.on("disconnect", () => {
    if (socket.id === players.w) delete players.w;
    if (socket.id === players.b) delete players.b;
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});