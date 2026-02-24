const socket = io();

const chess = new Chess();
const boardElement = document.querySelector(".chessBoard");
const resetBtn = document.getElementById("resetBtn");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

function renderBoard() {
  const board = chess.board();
  boardElement.innerHTML = "";

  boardElement.classList.remove("flipped");
  if (playerRole === "b") {
    boardElement.classList.add("flipped");
  }

  board.forEach((row, rowIndex) => {
    row.forEach((square, colIndex) => {

      const squareElement = document.createElement("div");
      squareElement.className =
        "square " + ((rowIndex + colIndex) % 2 === 0 ? "light" : "dark");

      squareElement.dataset.row = rowIndex;
      squareElement.dataset.col = colIndex;

      if (square) {
        const pieceElement = document.createElement("img");
        pieceElement.classList.add("piece");

        pieceElement.src = `/pieces/${square.color}${square.type}.svg`;
        pieceElement.draggable = playerRole === square.color;

        pieceElement.addEventListener("dragstart", () => {
          if (playerRole !== square.color) return;
          draggedPiece = pieceElement;
          sourceSquare = { row: rowIndex, col: colIndex };
        });

        pieceElement.addEventListener("dragend", () => {
          draggedPiece = null;
          sourceSquare = null;
        });

        squareElement.appendChild(pieceElement);
      }

      squareElement.addEventListener("dragover", e => e.preventDefault());

      squareElement.addEventListener("drop", () => {
        if (!draggedPiece) return;

        const targetSquare = {
          row: parseInt(squareElement.dataset.row),
          col: parseInt(squareElement.dataset.col)
        };

        handleMove(sourceSquare, targetSquare);
      });

      boardElement.appendChild(squareElement);
    });
  });
}

function handleMove(source, target) {

  if (source.row === target.row && source.col === target.col) return;

  const move = {
    from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
    to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
    promotion: "q"
  };

  socket.emit("move", move);
}

resetBtn.addEventListener("click", () => {
  socket.emit("resetGame");
});

socket.on("playerRole", role => {
  playerRole = role;
  renderBoard();
});

socket.on("spectator", () => {
  playerRole = null;
  renderBoard();
});

socket.on("boardState", fen => {
  chess.load(fen);
  renderBoard();
});

socket.on("gameOver", data => {
  if (data.type === "checkmate") {
    alert("Checkmate! Winner: " + data.winner);
  }
  if (data.type === "draw") {
    alert("Game Draw!");
  }
});

renderBoard();