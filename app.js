let boxes = document.querySelectorAll(".box");
let playerBtn = document.querySelector("#player");
let computerBtn = document.querySelector("#computer");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;
let iscomputer = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winner");
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    document.querySelector(".game").classList.remove("hide"); // 👈 remove hide
    document.querySelector("#reset-btn").classList.remove("hide"); // 👈 hide the board
    document.querySelector(".mode-selector").classList.remove("hide"); // 👈 hide the board
    document.querySelector("#tic").classList.remove("hide"); // 👈 hide the board


    // Enable mode buttons again
    playerBtn.disabled = false;
    computerBtn.disabled = false;
};

playerBtn.addEventListener("click", () => {
    iscomputer = false;
    resetGame();
});

computerBtn.addEventListener("click", () => {
    iscomputer = true;
    resetGame();
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;

        // Disable mode buttons **only in computer mode**
        if (iscomputer) {
            playerBtn.disabled = true;
            computerBtn.disabled = true;
        }

        if (turnO) {
            box.innerText = "O";
            box.style.color = "#ff0fff";
        } else {
            box.innerText = "X";
            box.style.color = "red";
        }

        box.disabled = true;
        count++;

        let iswinner = checkWinner();
        if (count === 9 && !iswinner) {
            display();
        }

        turnO = !turnO;

        // Let computer make a move only if it's computer mode and not already won
        if (iscomputer && !turnO && count < 9 && !iswinner) {
            setTimeout(computerMove, 500);
        }
    });
});

const computerMove = () => {
    let emptyBoxes = Array.from(boxes).filter((box) => box.innerText === "");
    if (emptyBoxes.length === 0) return;

    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "X";
    randomBox.style.color = "red";  
    randomBox.disabled = true;
    count++;

    let iswinner = checkWinner();
    if (count === 9 && !iswinner) {
        display();
    }

    turnO = true;
};

const display = () => {
    msg.innerText = "It was a draw";
    msgContainer.classList.remove("hide");
    document.querySelector(".game").classList.add("hide"); // 👈 hide the board


};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    document.querySelector(".game").classList.add("hide"); // 👈 hide the board
    document.querySelector("#reset-btn").classList.add("hide"); // 👈 hide the board
    document.querySelector(".mode-selector").classList.add("hide"); // 👈 hide the board
    document.querySelector("#tic").classList.add("hide"); // 👈 hide the board

    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
