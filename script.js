
const playButtonHTML = document.querySelector('#playButtonHTML');
const finalResultHTML = document.querySelector('#finalResultHTML');
const currentPlayerHTML = document.querySelector('#currentPlayerHTML');
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var winner = 0; // 1||2||4(Tie)
var currentPlayer = 1; // 1||2

const winningConditions = [
    //combinations of winning board-indexes
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

playButtonHTML.addEventListener('click', startGame);
function startGame() {
    resetBoard();//clears board visually
    console.log('game started');

    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //clears board logically
    winner = 0;
    currentPlayer = 1;
    if (currentPlayer === 1) {
        currentPlayerHTML.innerHTML = '<img src="img/o.png" alt="">';
    } else {
        currentPlayerHTML.innerHTML = '<img src="img/x.png" alt="">';
    }

    for (let i = 0; i <= 8; i++) {
        let element = document.getElementById(i);
        element.addEventListener('click', move);
    }

}

function move() {
    let index = this.id;
    console.log('clicked Board index: ' + index);
    //check if move is valid
    if (board[index] === 0) {
        //change board entry
        board[index] = currentPlayer;
        if (currentPlayer === 1) {
            document.getElementById(index).innerHTML = '<img src="img/o.png" alt="">';
        } else {
            document.getElementById(index).innerHTML = '<img src="img/x.png" alt="">';
        }

        evaluate();
        if (winner === 0) {
            changePlayer();
        }
    }
}

function evaluate() {
    for (let i = 0; i <= 7; i++) {
        const winningCondition = winningConditions[i];

        //checks if all three fields are filled
        if (board[winningCondition[0]] === 0 ||
            board[winningCondition[1]] === 0 ||
            board[winningCondition[2]] === 0) {
            //Game continues
            console.log('game continues -> no result');
            continue;
        }
        //checks if any winning condition is fullfilled
        if (board[winningCondition[0]] === board[winningCondition[1]] &&
            board[winningCondition[1]] === board[winningCondition[2]]) {
            //Game is won
            console.log('winner found');
            winner = currentPlayer;
            setWinner(winner);
            break;
        }
        //all fields are filled and no winning condition is fullfilled
        else if (!board.includes(0) && i === 7) {
            //Game ends:  tie
            console.log('tie');
            winner = 4;
            setWinner(winner);
            break;
        }
    }

}

function changePlayer() {
    console.log('change player method arrived ' + currentPlayer);
    if (currentPlayer === 1) {
        currentPlayer = 2;
    }
    else {
        currentPlayer = 1;
    }
    if (currentPlayer === 1) {
        currentPlayerHTML.innerHTML = '<img src="img/o.png" alt="">';
    } else {
        currentPlayerHTML.innerHTML = '<img src="img/x.png" alt="">';
    }
}

function setWinner(winner) {
    announceWinner(winner);
    for (let i = 0; i <= 8; i++) {
        document.getElementById(i).removeEventListener('click', move);
    }
}

function announceWinner(winner) {
    //announces the final result/winner
    if (winner == 1) {
        finalResultHTML.innerHTML = 'Player' + '<img src="img/o.png" alt="">' + 'won!';
    }
    else if (winner == 2) {
        finalResultHTML.innerHTML = 'Player' + '<img src="img/x.png" alt="">' + 'won!';
    }
    else if (winner == 4) {
        finalResultHTML.textContent = 'Tie!';
    }
}

function resetBoard() {
    for (let index = 0; index <= 8; index++) {
        document.getElementById(index).innerHTML = '';
    }
    finalResultHTML.textContent = '';
}