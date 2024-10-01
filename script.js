const board = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle user click
board.forEach(cell => {
    cell.addEventListener('click', function () {
        const cellIndex = this.getAttribute('data-index');
        if (gameBoard[cellIndex] === "" && gameActive) {
            updateCell(cellIndex, currentPlayer);
            if (checkWin(currentPlayer)) {
                message.textContent = `${currentPlayer} wins!`;
                gameActive = false;
            } else if (gameBoard.every(cell => cell !== "")) {
                message.textContent = "It's a draw!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if (currentPlayer === "O") {
                    computerMove();
                }
            }
        }
    });
});

// Update the cell and board state
function updateCell(index, player) {
    gameBoard[index] = player;
    board[index].textContent = player;
}

// Check if the current player has won
function checkWin(player) {
    return winConditions.some(condition => {
        return condition.every(index => gameBoard[index] === player);
    });
}

// Computer makes a move
function computerMove() {
    let emptyCells = gameBoard.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    let randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    updateCell(randomMove, currentPlayer);
    if (checkWin(currentPlayer)) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== "")) {
        message.textContent = "It's a draw!";
        gameActive = false;
    }
    currentPlayer = "X";
}

// Reset game
resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    message.textContent = "";
    board.forEach(cell => {
        cell.textContent = "";
    });
}
