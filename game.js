alert("are you human")
document.addEventListener("DOMContentLoaded", () => {
    const columns = 7;
    const rows = 6;
    const board = [];
    let currentPlayer = "red";
    const statusDisplay = document.getElementById("status");
    
    const createBoard = () => {
        const gameBoard = document.getElementById("game-board");
        for (let row = 0; row < rows; row++) {
            board[row] = [];
            for (let col = 0; col < columns; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("click", handleClick);
                gameBoard.appendChild(cell);
                board[row][col] = "";
            }
        }
    };

    const handleClick = (e) => {
        const col = e.target.dataset.col;
        for (let row = rows - 1; row >= 0; row--) {
            if (board[row][col] === "") {
                board[row][col] = currentPlayer;
                const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
                cell.classList.add(currentPlayer);
                if (checkWin(row, col)) {
                    statusDisplay.textContent = `${currentPlayer.toUpperCase()} wins!`;
                    disableBoard();
                } else if (isBoardFull()) {
                    statusDisplay.textContent = "It's a draw!";
                } else {
                    currentPlayer = currentPlayer === "red" ? "yellow" : "red";
                }
                break;
            }
        }
    };

    const checkWin = (row, col) => {
        return (
            checkDirection(row, col, 1, 0) ||
            checkDirection(row, col, 0, 1) ||
            checkDirection(row, col, 1, 1) ||
            checkDirection(row, col, 1, -1)
        );
    };

    const checkDirection = (row, col, rowInc, colInc) => {
        let count = 0;
        let r = row;
        let c = col;
        while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
            count++;
            r += rowInc;
            c += colInc;
        }
        r = row - rowInc;
        c = col - colInc;
        while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
            count++;
            r -= rowInc;
            c -= colInc;
        }
        return count >= 4;
    };

    const isBoardFull = () => {
        return board.flat().every(cell => cell !== "");
    };

    const disableBoard = () => {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.removeEventListener("click", handleClick);
        });
    };

    createBoard();
});
