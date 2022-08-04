const CLASS_X = "x";
const CLASS_CIRCLE = "circle";
let circleTurn = true
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winningMesssageTextEl = document.querySelector("[data-winning-message-text]")
const winningMesssageEl = document.getElementById("winning-message")
const cellElement = document.querySelectorAll("[data-cell]")
const board = document.querySelector("#board")
const restartButton = document.getElementById("restart")

restartButton.addEventListener("click", startGame)

startGame()



function startGame() {
    winningMesssageEl.classList.remove("show")
    circleTurn = false
    cellElement.forEach(cell => { 
        cell.classList.remove(CLASS_X)
        cell.classList.remove(CLASS_CIRCLE)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    });
    setBoardHoverClass()
    cell.removeEev
}


function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CLASS_CIRCLE : CLASS_X
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        switchTurn()
        setBoardHoverClass()
    }
}

function isDraw() {
    return [...cellElement].every(cell => {
        return cell.classList.contains(CLASS_X) || cell.classList.contains(CLASS_CIRCLE)
    })
}

function endGame(draw) {
    if (draw) {
        winningMesssageTextEl.textContent = "Draw!!"
    } else {
        addWinningtext()
    }
    winningMesssageEl.classList.add("show")
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurn () {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(CLASS_X)
    board.classList.remove(CLASS_CIRCLE)
    if (circleTurn) {
        board.classList.add(CLASS_CIRCLE)
    } else {
        board.classList.add(CLASS_X)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass)
        })
    })
}

function addWinningtext() {
    if (circleTurn) {
        winningMesssageTextEl.textContent = "O's Wins!!"
    } else {
        winningMesssageTextEl.textContent = "X's Wins!!"
    }
}

