"use strict";
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
function drawVignette() {
    //draw light
    ctx.globalCompositeOperation = "lighten";
    let gradient = ctx.createRadialGradient(snake[0].positionX + GridW / 2, snake[0].positionY + GridH / 2, 0, snake[0].positionX + GridW / 2, snake[0].positionY + GridH / 2, viewDistance);
    gradient.addColorStop(0, "rgba(226, 216, 182, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctx.fillStyle = gradient;
    let vignette = new Path2D();
    vignette.rect(0, 0, canvas.width, canvas.height);
    ctx.fill(vignette);
    //draw darkness
    ctx.globalCompositeOperation = "source-over";
    gradient = ctx.createRadialGradient(snake[0].positionX + GridW / 2, snake[0].positionY + GridH / 2, 0, snake[0].positionX + GridW / 2, snake[0].positionY + GridH / 2, viewDistance);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = gradient;
    vignette.rect(0, 0, canvas.width, canvas.height);
    ctx.fill(vignette);
}
function generateGrid(width, height, rows, cols) {
    for (let i = 0; i <= cols; i++) {
        let x = i * GridW;
        for (let j = 0; j <= rows; j++) {
            let y = j * GridH;
            let cell = {
                positionX: x,
                positionY: y,
                class: "",
                height: GridH,
                width: GridW,
                x: i,
                y: j
            };
            grid.push(cell);
        }
    }
}
function drawGrid() {
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = 1;
    for (let i = 0; i < grid.length; i++) {
        let cell = grid[i];
        let rect = new Path2D();
        rect.rect(cell.positionX, cell.positionY, cell.width, cell.height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
window.addEventListener("keypress", _event => {
    switch (_event.key) {
        case "w":
            if (snake[0].direction == "down") {
            }
            else {
                snake[0].direction = "up";
            }
            break;
        case "a":
            if (snake[0].direction == "right") {
            }
            else {
                snake[0].direction = "left";
            }
            break;
        case "s":
            if (snake[0].direction == "up") {
            }
            else {
                snake[0].direction = "down";
            }
            break;
        case "d":
            if (snake[0].direction == "left") {
            }
            else {
                snake[0].direction = "right";
            }
            break;
    }
});
function generateSnake(length, startX, startY) {
    for (let i = 0; i < length; i++) {
        let posX;
        let posY;
        //scan the grid Array for the position for the snake Start
        for (let j = 0; j < grid.length; j++) {
            if (snake.length <= length && grid[j].x == startX + snake.length && grid[j].y == startY) {
                posX = grid[j].positionX;
                posY = grid[j].positionY;
                let cell = {
                    direction: "left",
                    positionX: posX,
                    positionY: posY,
                    height: GridH,
                    width: GridW,
                    isTop: false,
                    x: grid[j].x,
                    y: grid[j].y
                };
                snake.push(cell);
            }
        }
    }
    snake[0].isTop = true;
}
function feedSnake() {
    // Add a new segment at the same position as the tail
    let tail = snake[snake.length - 1];
    let newSegment = {
        direction: tail.direction,
        positionX: tail.positionX,
        positionY: tail.positionY,
        height: GridH,
        width: GridW,
        isTop: false,
        x: tail.x,
        y: tail.y
    };
    snake.push(newSegment);
}
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        let cell = snake[i];
        let posX = 0;
        let posY = 0;
        ctx.fillStyle = "rgb(81, 50, 31)";
        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.lineWidth = 1;
        let rect = new Path2D();
        for (let j = 0; j < grid.length; j++) {
            if (grid[j].x == cell.x && grid[j].y == cell.y) {
                posX = grid[j].positionX;
                posY = grid[j].positionY;
            }
        }
        rect.rect(posX, posY, cell.width, cell.height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
function moveSnake() {
    // Move body
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
        snake[i].direction = snake[i - 1].direction;
    }
    // Move head
    switch (snake[0].direction) {
        case "left":
            snake[0].x--;
            break;
        case "right":
            snake[0].x++;
            break;
        case "down":
            snake[0].y++;
            break;
        case "up":
            snake[0].y--;
            break;
    }
    // Update positions
    for (let i = 0; i < snake.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[j].x == snake[i].x && grid[j].y == snake[i].y) {
                snake[i].positionX = grid[j].positionX;
                snake[i].positionY = grid[j].positionY;
            }
        }
    }
}
function generateBounds() {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].x == GridX - 1 || grid[i].x == 0 || grid[i].y == GridY - 1 || grid[i].y == 0) {
            let cell = {
                positionX: grid[i].positionX,
                positionY: grid[i].positionY,
                class: "",
                height: GridH,
                width: GridW,
                x: grid[i].x,
                y: grid[i].y
            };
            Bounds.push(cell);
        }
    }
}
function drawBounds() {
    ctx.fillStyle = "rgb(140, 99, 99)";
    ctx.strokeStyle = "rgb(84, 84, 84)";
    ctx.lineWidth = 3;
    let rect = new Path2D();
    for (let i = 0; i < Bounds.length; i++) {
        rect.rect(Bounds[i].positionX, Bounds[i].positionY, Bounds[i].width, Bounds[i].height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
function generateFood() {
    let randIndex = Math.floor(Math.random() * grid.length - 1);
    let food = {
        positionX: grid[randIndex].positionX,
        positionY: grid[randIndex].positionY,
        class: "",
        height: GridH,
        width: GridW,
        x: grid[randIndex].x,
        y: grid[randIndex].y
    };
    Food.push(food);
}
function addFood() {
    let randIndex = Math.floor(Math.random() * grid.length - 1);
    let food = {
        positionX: grid[randIndex].positionX,
        positionY: grid[randIndex].positionY,
        class: "",
        height: GridH,
        width: GridW,
        x: grid[randIndex].x,
        y: grid[randIndex].y
    };
    Food.push(food);
}
function drawFood() {
    ctx.fillStyle = "rgb(189, 0, 0)";
    ctx.strokeStyle = "rgb(255, 224, 122)";
    ctx.lineWidth = GridH / 2;
    let rect = new Path2D();
    for (let i = 0; i < Food.length; i++) {
        rect.rect(Food[i].positionX, Food[i].positionY, Food[i].width, Food[i].height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
let viewDistance = 300;
let bg = new Path2D();
bg.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fill(bg);
let grid = [];
let snake = [];
let Bounds = [];
let Food = [];
let GridY = 40;
let GridX = 40;
let GridW = 25;
let GridH = 25;
generateGrid(canvas.width, canvas.height, GridX, GridY);
generateBounds();
generateFood();
generateSnake(2, 5, 5);
let delay = 0;
function animate() {
    moveSnake();
    // Check if snake's head collides with food
    if (snake[0].x === Food[0].x && snake[0].y === Food[0].y) {
        console.log("Snake length before eating:", snake.length);
        Food.pop();
        addFood();
        feedSnake();
        console.log("Snake length after eating:", snake.length);
    }
    ctx.putImageData(imgData, 0, 0);
    // drawGrid();
    // drawBounds();
    drawFood();
    drawSnake();
    drawVignette();
    requestAnimationFrame(animate);
}
drawGrid();
drawBounds();
let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
requestAnimationFrame(animate);
console.log(grid);
console.log(Bounds);
