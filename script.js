const statusDisplay = document.getElementById("status");
const board = document.getElementById("board");
const cells = Array.from(document.querySelectorAll(".cell"));
const resetButton = document.getElementById("resetButton");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

function updateStatus(message) {
  statusDisplay.textContent = message;
}

function handleCellClick(event) {
  const cell = event.target;

  if (!cell.classList.contains("cell")) {
    return;
  }

  const cellIndex = Number(cell.dataset.cellIndex);

  if (!gameActive || gameState[cellIndex] !== "") {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  const winner = getWinningCombination();
  if (winner) {
    gameActive = false;
    winner.forEach((index) => cells[index].classList.add("winning-cell"));
    updateStatus(`Player ${currentPlayer} wins!`);
    return;
  }

  if (gameState.every((cellValue) => cellValue !== "")) {
    gameActive = false;
    updateStatus("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`Player ${currentPlayer}'s turn`);
}

function getWinningCombination() {
  return winningCombinations.find(([a, b, c]) => {
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = Array(9).fill("");

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winning-cell");
  });

  updateStatus("Player X's turn");
}

board.addEventListener("click", handleCellClick);
resetButton.addEventListener("click", resetGame);
