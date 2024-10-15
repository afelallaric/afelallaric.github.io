const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'O'; 
let gameActive = true;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDiv.textContent = currentPlayer + ' menang';
        gameActive = false;
        resetBtn.style.display = 'inline-block';
        return;
    }

    if (!board.includes('')) {
        statusDiv.textContent = 'Seri';
        gameActive = false;
        resetBtn.style.display = 'inline-block';
        return;
    }

    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
    statusDiv.textContent = `Giliran ${currentPlayer}`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'O';
    statusDiv.textContent = `Giliran ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
    resetBtn.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

resetBtn.addEventListener('click', resetGame);

statusDiv.textContent = `Giliran ${currentPlayer}`;
