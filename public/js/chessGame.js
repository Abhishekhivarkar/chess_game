

const socket = io();

socket.on("connect", () => {
    console.log("Connected:", socket.id);
});

const chess = new Chess()
const boardElement = document.querySelector(".chessBoard")

let draggedPiece = null
let sourceSquare = null
let playerRole = null 


const renderBoard = () =>{
 const board = chess.board()
 boardElement.innerHTML = ""
 board.forEach((row,rowIndex)=>{
  row.forEach((square,squareIndex)=>{
   const squareElement = document.createElement("div")
   squareElement.classList.add(
    "square",
    (rowIndex + squareIndex) % 2 ? "light" : "dark"
    )
    
    squareElement.dataset.row = rowIndex
    squareElement.dataset.col = squareIndex
    
    if(square){
     const pieceElement = document.createElement("div")
     pieceElement.classList.add(
      "piece",
      square.color === "w" ? "white" : "black"
      )
      pieceElement.innerText = getPieceUnicode(square)
      pieceElement.draggable = playerRole === square.color 
      
      pieceElement.addEventListener("dragstart",(e)=>{
       if(pieceElement.draggable){
        draggedPiece = pieceElement
        sourceSquare = {row:rowIndex ,col:squareIndex}
        e.dataTransfer.setData("text/plain","")
       }
      })
      
      pieceElement.addEventListener("dragend",(e)=>{
       draggedPiece = null
       sourceSquare = null
      })
      squareElement.appendChild(pieceElement)
    }
    
    squareElement.addEventListener("dragover",function(e){
     e.preventDefault()
    })
    
    squareElement.addEventListener("drop",function(e){
     e.preventDefault()
     if(draggedPiece){
      const targetSource = {
       col:parseInt(squareElement.dataset.col),
       row:parseInt(squareElement.dataset.row)
      }
      handleMove(sourceSquare,targetSource)
     }
     
    })
    boardElement.appendChild(squareElement)
  })
 })
 
}

const handleMove = (source,target) => {
 const move = {
  from:`${String.fromCharCode(97+source.col)}${8-source.row}`,
  to:`${String.fromCharCode(97+target.col)}${8-
  target.row}`,
  promotion:"q"
 }
 socket.emit("move",move)
}

const getPieceUnicode = (piece) => {
  const unicodePieces = {
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟"
  };

  const whitePieces = {
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟"
  };

  return piece.color === "w"
    ? whitePieces[piece.type]
    : unicodePieces[piece.type];
};


socket.on("playerRole",function(role){
 playerRole=role
 renderBoard()
})

socket.on("spectator",function(role){
 playerRole=null
 renderBoard()
})

socket.on("boardState",function(fen){
 chess.load(fen)
 renderBoard()
})

socket.on("move",function(move){
 chess.move(move)
 renderBoard()
})
renderBoard()