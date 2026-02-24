# ♟ Real-Time Multiplayer Chess Game

A real-time multiplayer chess game built using:

-   Node.js
-   Express.js
-   Socket.IO
-   Chess.js
-   HTML + CSS (Responsive UI)
-   SVG Chess Pieces (Professional Staunton Set)

------------------------------------------------------------------------

## 🚀 Features

-   Real-time multiplayer using WebSockets (Socket.IO)
-   Automatic player assignment (White / Black)
-   Spectator mode support
-   Turn-based validation (server-side)
-   Illegal move prevention
-   Board state synchronization using FEN
-   Professional SVG chess pieces
-   Responsive square chessboard
-   Drag and Drop piece movement

------------------------------------------------------------------------

## 🏗 Project Structure

    CHESS_GAME/
│
├── app.js
├── package.json
├── package-lock.json
│
├── public/
│   │
│   ├── css/
│   │     └── style.css
│   │
│   ├── js/
│   │     └── chessGame.js
│   │
│   └── pieces/
│         ├── wp.svg
│         ├── wr.svg
│         ├── wn.svg
│         ├── wb.svg
│         ├── wq.svg
│         ├── wk.svg
│         ├── bp.svg
│         ├── br.svg
│         ├── bn.svg
│         ├── bb.svg
│         ├── bq.svg
│         └── bk.svg
│
└── views/
      └── index.ejs

------------------------------------------------------------------------

## ⚙️ Installation

### 1️⃣ Clone the repository

    git clone <your-repo-url>
    cd chess-project

### 2️⃣ Install dependencies

    npm install

### 3️⃣ Required Dependencies

-   express
-   socket.io
-   chess.js
-   ejs

If needed manually:

    npm install express socket.io chess.js ejs

------------------------------------------------------------------------

## ▶️ Run the Server

    node server.js

Server will start on:

    http://localhost:3000

------------------------------------------------------------------------

## 🎮 How It Works

### Player Assignment

-   First connected user → White
-   Second connected user → Black
-   Others → Spectators

### Move Flow

1.  Player drags a piece
2.  Move is emitted to server
3.  Server validates:
    -   Turn
    -   Legal move
4.  If valid → Board state updated
5.  New FEN broadcast to all players

------------------------------------------------------------------------

## 🔐 Server-Side Validation

The server: - Controls game state - Prevents cheating - Enforces turn
order - Rejects invalid moves

------------------------------------------------------------------------

## 🎨 SVG Chess Pieces

This project uses professional Staunton SVG chess pieces for:

-   Perfect scaling
-   No distortion
-   Consistent cross-device rendering
-   Professional chess.com style UI

------------------------------------------------------------------------

## 📱 Responsive Design

The board:

-   Maintains 1:1 aspect ratio
-   Uses CSS Grid (8x8)
-   Scales with viewport
-   Works on mobile and desktop

------------------------------------------------------------------------

## 🧠 Future Improvements

-   Move highlighting
-   Check & Checkmate indication
-   Game restart
-   Timer support
-   Room-based multiplayer
-   Game history
-   Player names
-   Rating system
-   Stockfish AI integration

------------------------------------------------------------------------

## 🛡 Technologies Used

  Technology   Purpose
  ------------ ---------------------------
  Node.js      Backend runtime
  Express      Server framework
  Socket.IO    Real-time communication
  Chess.js     Chess logic & validation
  EJS          Template rendering
  SVG          High-quality chess pieces

------------------------------------------------------------------------

## 📌 Author

Developed by Abhishek Hivarkar🚀

------------------------------------------------------------------------

## 📜 License

This project is for educational and personal use.

------------------------------------------------------------------------

Happy Coding ♟🔥