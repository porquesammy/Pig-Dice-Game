// jshint esversion: 6
const p1Score = document.querySelector('.p1Score');
const p2Score = document.querySelector('.p2Score');
const player1 = document.querySelector('.p1Header button');
const player2 = document.querySelector('.p2Header button');
const p1TempScore = document.querySelector('.p1TempScoreNo');
const p2TempScore = document.querySelector('.p2TempScoreNo');
const newGameBtn = document.querySelector('.newGameBtn');
const keepBtn = document.querySelector('.keepBtn button');
const diceImg = document.querySelector('.diceJS');
const rollBtn = document.querySelector('.rollBtn button');

let currentPlayer;

function newGame() {
        diceImg.setAttribute('src', `./assets/dice1.png`);
        p1Score.textContent = '0';
        p2Score.textContent = '0';
        p1TempScore.textContent = '0';
        p2TempScore.textContent = '0';
        player1.classList.remove('activeJS');
        player2.classList.remove('activeJS');
        player1.classList.add('activeJS');
        currentPlayer = 'p1';
        p1Score.style.color = '#444444';
        p2Score.style.color = '#444444';
}

newGame();

newGameBtn.addEventListener('click', () => newGame());

const checkForWin = () => {
        if (Number(p1Score.textContent) >= 100 || Number(p2Score.textContent) >= 100) {
                currentPlayer = null;
                player1.classList.remove('activeJS');
                player2.classList.remove('activeJS');
                if (Number(p1Score.textContent) >= 100) {
                        p1Score.style.color = '#bada55';
                } else {
                        p2Score.style.color = '#bada55';
                }
        }
};

function keepTempScore() {
        checkForWin();
        if (currentPlayer === 'p1' && p1TempScore.textContent !== '0') {
                const currentTemp = p1TempScore.textContent;
                const currentTotal = p1Score.textContent;
                const newTotal = Number(currentTemp) + Number(currentTotal);
                p1Score.textContent = newTotal;
                p1TempScore.textContent = '0';
                currentPlayer = 'p2';
                player1.classList.remove('activeJS');
                player2.classList.add('activeJS');
                checkForWin();
        } else if (currentPlayer === 'p2' && p2TempScore.textContent !== '0') {
                const currentTemp = p2TempScore.textContent;
                const currentTotal = p2Score.textContent;
                const newTotal = Number(currentTemp) + Number(currentTotal);
                p2Score.textContent = newTotal;
                p2TempScore.textContent = '0';
                currentPlayer = 'p1';
                player2.classList.remove('activeJS');
                player1.classList.add('activeJS');
                checkForWin();
        }
}

keepBtn.addEventListener('click', () => keepTempScore());

function roll() {
        checkForWin();
        if (currentPlayer === null) {
                return null;
        }
        if (currentPlayer === 'p1') {
                const sixSideDie = Math.floor(Math.random() * 6 + 1);
                diceImg.setAttribute('src', `./assets/dice${sixSideDie}.png`);
                if (sixSideDie === 1) {
                        p1TempScore.textContent = '0';
                        currentPlayer = 'p2';
                        player1.classList.remove('activeJS');
                        player2.classList.add('activeJS');
                } else {
                        const currentTemp = p1TempScore.textContent;
                        const newTotal = Number(currentTemp) + sixSideDie;
                        p1TempScore.textContent = newTotal;
                        checkForWin();
                }
        } else if (currentPlayer === 'p2') {
                const sixSideDie = Math.floor(Math.random() * 6 + 1);
                diceImg.setAttribute('src', `./assets/dice${sixSideDie}.png`);
                if (sixSideDie === 1) {
                        p2TempScore.textContent = '0';
                        currentPlayer = 'p1';
                        player2.classList.remove('activeJS');
                        player1.classList.add('activeJS');
                } else {
                        const currentTemp = p2TempScore.textContent;
                        const newTotal = Number(currentTemp) + sixSideDie;
                        p2TempScore.textContent = newTotal;
                        checkForWin();
                }
        }
}

rollBtn.addEventListener('click', () => roll());
