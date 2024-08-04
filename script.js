//enabling strict mode
"use strict";

//Get the relevant DOM elements
const gameContainer = document.querySelector(".game");
const checkBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("btn-reset");
const scoreEl = document.querySelector(".score");
const highScoreEl = document.querySelector(".highscore");
const messageEl = document.querySelector(".message");
const correctAnswerEl = document.querySelector(".correct-answer");
let correctNum = Math.trunc(Math.random() * 20 + 1);

//Tracking score and highscore
let score = 20;
let highScore = 0;

//Function to handle game date display in the DOM
function gameDataHandler(highSC, guessedNum, message) {
    highScoreEl.textContent = `Highscore: ${highSC}`;
    messageEl.textContent = message;
    correctAnswerEl.textContent = `${guessedNum}`;
}

function displayMessage(msg) {
    messageEl.textContent = msg;
}

//Function to handle overall game logic
const gameLogicHandler = () => {
    let guessedNumber = parseInt(
        document.getElementById("guessed-number").value
    );

    if (!guessedNumber || guessedNumber > 20 || guessedNumber < 1) {
        displayMessage(`🤦‍♂️ Wrong entry, choose number between 1 - 20`);
        return;
    }

    if (score < 1) {
        displayMessage(`🤦‍♂️ You lost...!. Start again`);
        return;
    }

    if (guessedNumber === correctNum) {
        if (highScore < score) {
            highScore = score;
        }
        gameDataHandler(highScore, guessedNumber, "Correct answer...!");
        gameContainer.classList.add("game-correct");
        correctNum = Math.trunc(Math.random() * 20 + 1);
    } else {
        let message =
            guessedNumber > correctNum ? `Too High...!` : `Too Low...!`;
        displayMessage(message);
        correctAnswerEl.textContent = `?`;
        gameContainer.classList.remove("game-correct");
        score--;
    }
    scoreEl.textContent = `Score: ${score}`;
};
checkBtn.addEventListener("click", gameLogicHandler);

//Reseting the game
const resetGame = () => {
    score = 20;
    gameDataHandler(highScore, "?", "start guessing...");
    scoreEl.textContent = `Score: ${score}`;
    correctNum = Math.trunc(Math.random() * 20 + 1);
    console.log(correctNum);
    gameContainer.classList.remove("game-correct");
    document.getElementById("guessed-number").value = "";
};
resetBtn.addEventListener("click", resetGame);
