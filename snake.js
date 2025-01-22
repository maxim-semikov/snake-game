const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const snakeSize = 20;
const w = 400;
const h = 400;
let score = 0;
let snake;
let food;
let gameInterval;

function init() {
    snake = [];
    for (let i = 4; i >= 0; i--) {
        snake.push({x: i, y: 0});
    }

    food = {
        x: Math.floor(Math.random() * (w / snakeSize)),
        y: Math.floor(Math.random() * (h / snakeSize))
    };

    window.addEventListener('keydown', keyDownEvent);
    gameInterval = setInterval(paint, 100);
}

function paint() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < snake.length; i++) {
        const { x, y } = snake[i];
        paintCell(x, y);
    }

    paintCell(food.x, food.y, true);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (direction === 'right') snakeX++;
    else if (direction === 'left') snakeX--;
    else if (direction === 'up') snakeY--;
    else if (direction === 'down') snakeY++;

    if (snakeX === -1 || snakeX === w/snakeSize || snakeY === -1 || snakeY === h/snakeSize || checkCollision(snakeX, snakeY)) {
        stopGame();
        return;
    }

    let tail = {x: snakeX, y: snakeY};
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        createFood();
    } else {
        tail = snake.pop();
        tail.x = snakeX;
        tail.y = snakeY;
    }

    snake.unshift(tail);
    ctx.fillText('Score: ' + score, 5, h - 5);
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * (w / snakeSize)),
        y: Math.floor(Math.random() * (h / snakeSize))
    };
}

function checkCollision(x, y) {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y)
            return true;
    }
    return false;
}

function paintCell(x, y, isFood=false) {
    ctx.fillStyle = isFood ? 'red' : 'green';
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = isFood ? 'darkred' : 'darkgreen';
    ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
}

let direction = 'right';

function keyDownEvent(e) {
    switch (e.keyCode) {
        case 37:
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case 38:
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 39:
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
        case 40:
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
    }
}

function stopGame() {
    clearInterval(gameInterval);  // Останавливаем игровой цикл
    alert('Game over! Score: ' + score);
}

init();
