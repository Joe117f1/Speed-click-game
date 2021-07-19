'use strict;'

let gBoard;
let gChooseLvl;
let gBoardSize;
let gCounter = 0;
let gSeconds;
let gTimerCount;

const init = () => {
    gChooseLvl = setGameLvl(1);
};

const setGameLvl = (num) => {

    if (num === 1 || !num) {
        gBoard = createBoard(16);
        gBoardSize = 4;
    } else if (num === 2) {
        gBoard = createBoard(25);
        gBoardSize = 5;
    } else if (num === 3) {
        gBoard = createBoard(36);
        gBoardSize = 6;
    } else if (num === 4) {
        gBoard = createBoard(64);
        gBoardSize = 8;
    } else {
        gBoard = createBoard(16);
        gBoardSize = 4;
    };

    clearInterval(gTimerCount);
    gSeconds = 0;
    const seconds = document.getElementById('seconds-counter');
    seconds.innerText = gSeconds;
    renderBoard();
};

const createBoard = (maxNum) => {
    const board = getGameNums(1, maxNum);
    shuffle(board);
    return board;
};

const renderBoard = () => {
    let length = gBoardSize;
    const gameTabelElement = document.querySelector('.game-table');
    let strHtml = ``;
    for (let i = 0; i < length; i++) {
        strHtml += `<tr>`;
        for (let j = 0; j < length; j++) {
            const currNum = gBoard.pop();
            strHtml += `<td <button onclick="numClicked(this,${[currNum]})">${currNum}</button>`;
        };
        strHtml += `</tr>`;
    };
    gameTabelElement.innerHTML = strHtml;
};

const getGameNums = (min, max) => {
    const nums = [];
    for (let i = min; i <= max; i++) {
        nums.push(i);
    };
    return nums;
};

const shuffle = (items) => {
    let randomIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randomIdx = getRandomIntInclusive(0, items.length - 1);

        keep = items[i];
        items[i] = items[randomIdx];
        items[randomIdx] = keep;
    };
    return items;
};

const numClicked = (clickedNum, targetNum) => {
    if (targetNum > gCounter && targetNum < gCounter + 2) {
        clickedNum.style.color = 'black';
        clickedNum.style.backgroundColor = 'mediumaquamarine';
        gCounter++;

        if (gCounter === 1) {
            timer();
        };
        if (targetNum === gBoardSize ** 2) {
            clearInterval(gTimerCount);
            gameWon();
        };
    };
};

const gameWon = () => {
    console.log('win!!')
    const titleElement = document.querySelector('.game-status');
    const gameTabelElement = document.querySelector('.game-table');
    const cellElement = document.querySelector('.td');
    titleElement.innerText = 'You Made It!';
    gameTabelElement.style.backgroundColor = 'white';
    cellElement.classList.add('.win');
};

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNum = Math.floor(Math.random() * (max - min)) + min;
    return randomNum;
};

const timer = () => {
    gSeconds = 0;
    const secondsElement = document.getElementById('seconds-counter');
    const incrementSeconds = () => {
        gSeconds += 1;
        secondsElement.innerText = gSeconds;
    };
    gTimerCount = setInterval(incrementSeconds, 1000);
};