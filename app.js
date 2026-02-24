const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const chess = new Chess(); 

const players = {};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    if (!players.w) {
        players.w = socket.id;
        socket.emit("playerRole", "w");
    } 
    else if (!players.b) {
        players.b = socket.id;
        socket.emit("playerRole", "b");
    } 
    else {
        socket.emit("spectator");
    }

    socket.emit("boardState", chess.fen());

    socket.on("move", (move) => {
        try {

            
            if (chess.turn() === "w" && socket.id !== players.w) return;
            if (chess.turn() === "b" && socket.id !== players.b) return;

            const result = chess.move(move);

            if (result) {
                io.emit("boardState", chess.fen());
            } else {
                socket.emit("invalidMove", move);
            }

        } catch (err) {
            console.log("Move error:", err);
            socket.emit("invalidMove", move);
        }
    });

    socket.on("disconnect", () => {
        if (socket.id === players.w) delete players.w;
        if (socket.id === players.b) delete players.b;
    });
});

server.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});