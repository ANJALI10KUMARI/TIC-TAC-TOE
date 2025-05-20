const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset-button");
const winnerBox = document.createElement("div");

winnerBox.id = "winner-box";
winnerBox.innerHTML = `
    <h2 id="winner-text"></h2>
    <button id="close-button">Close</button>
`;
document.body.appendChild(winnerBox);

const replayButton = document.createElement("button");
replayButton.id = "replay-button";
replayButton.textContent = "Replay";
replayButton.style.position = "absolute";
replayButton.style.top = "10px";
replayButton.style.left = "10px";
replayButton.style.width = "60px";
replayButton.style.height = "60px";
replayButton.style.borderRadius = "50%";
replayButton.style.background = "linear-gradient(135deg, #000000, #00008B)";
replayButton.style.color = "white";
replayButton.style.border = "none";
replayButton.style.cursor = "pointer";
replayButton.style.fontSize = "14px";
replayButton.style.display = "flex";
replayButton.style.justifyContent = "center";
replayButton.style.alignItems = "center";
document.body.insertAdjacentElement("beforeend", replayButton);

const winnerText = document.getElementById("winner-text");
const closeButton = document.getElementById("close-button");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function showWinnerBox(message) {
  winnerText.textContent = message;
  winnerBox.style.display = "block";
}

function hideWinnerBox() {
  winnerBox.style.display = "none";
}

function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      isGameActive = false;
      showWinnerBox(`${gameBoard[a]} wins!`);
      return;
    }
  }
  if (!gameBoard.includes("")) {
    isGameActive = false;
    showWinnerBox("It's a tie!");
  }
}

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameBoard[index] !== "" || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();

  if (isGameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  hideWinnerBox();
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
replayButton.addEventListener("click", resetGame);
closeButton.addEventListener("click", hideWinnerBox);

statusText.textContent = `Player ${currentPlayer}'s turn`;
