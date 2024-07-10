"use strict";
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
let grid = [];
let snake = [];
let Bounds = [];
let Food = [];
let BlindFood = [];
let Walls = [];
let Thief = [];
let images = [];
let GridY = 40;
let GridX = 40;
let CellW = 27;
let CellH = 27;
let viewDistance = 300;
let delay = 0;
// Load background image
const backgroundImage = new Image();
backgroundImage.src = "textures/level/Background.png";
// Load wall and wallshadow images
const wallImage = new Image();
wallImage.src = "textures/level/wall.png";
const wallShadowImage = new Image();
wallShadowImage.src = "textures/level/wallshadow.png";
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}
function drawWalls() {
    for (let i = 0; i < Walls.length; i++) {
        // Draw wallshadow
        ctx.drawImage(wallShadowImage, Walls[i].positionX, Walls[i].positionY, Walls[i].width, Walls[i].height);
        // Draw wall
        ctx.drawImage(wallImage, Walls[i].positionX, Walls[i].positionY, Walls[i].width, Walls[i].height);
    }
}
function drawBounds() {
    for (let i = 0; i < Bounds.length; i++) {
        // Draw wallshadow
        ctx.drawImage(wallShadowImage, Bounds[i].positionX, Bounds[i].positionY, Bounds[i].width, Bounds[i].height);
        // Draw wall
        ctx.drawImage(wallImage, Bounds[i].positionX, Bounds[i].positionY, Bounds[i].width, Bounds[i].height);
    }
}
function drawVignette() {
    //draw light
    ctx.globalCompositeOperation = "lighten";
    let gradient = ctx.createRadialGradient(snake[0].positionX + CellW / 2, snake[0].positionY + CellH / 2, 0, snake[0].positionX + CellW / 2, snake[0].positionY + CellH / 2, viewDistance);
    gradient.addColorStop(0, "rgba(226, 216, 182, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctx.fillStyle = gradient;
    let vignette = new Path2D();
    vignette.rect(0, 0, canvas.width, canvas.height);
    ctx.fill(vignette);
    //draw darkness
    ctx.globalCompositeOperation = "source-over";
    gradient = ctx.createRadialGradient(snake[0].positionX + CellW / 2, snake[0].positionY + CellH / 2, 0, snake[0].positionX + CellW / 2, snake[0].positionY + CellH / 2, viewDistance);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = gradient;
    vignette.rect(0, 0, canvas.width, canvas.height);
    ctx.fill(vignette);
}
function generateGrid(width, height, rows, cols) {
    for (let i = 0; i <= cols - 1; i++) {
        let x = i * CellW;
        for (let j = 0; j <= rows - 1; j++) {
            let y = j * CellH;
            let cell = {
                positionX: x,
                positionY: y,
                class: "",
                height: CellH,
                width: CellW,
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
                    direction: "right",
                    positionX: posX,
                    positionY: posY,
                    height: CellH,
                    width: CellW,
                    isTop: false,
                    x: grid[j].x - i,
                    y: grid[j].y
                };
                snake.push(cell);
            }
        }
    }
    snake[0].isTop = true;
}
function feedSnake() {
    let tail = snake[snake.length - 1];
    let newSegment = {
        direction: tail.direction,
        positionX: tail.positionX,
        positionY: tail.positionY,
        height: CellH,
        width: CellW,
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
                height: CellH,
                width: CellW,
                x: grid[i].x,
                y: grid[i].y
            };
            Bounds.push(cell);
        }
    }
}
function generateFood() {
    let randIndex = Math.floor(Math.random() * grid.length - 1);
    let food = {
        positionX: grid[randIndex].positionX,
        positionY: grid[randIndex].positionY,
        class: "",
        height: CellH,
        width: CellW,
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
        height: CellH,
        width: CellW,
        x: grid[randIndex].x,
        y: grid[randIndex].y
    };
    Food.push(food);
}
function drawFood() {
    ctx.fillStyle = "rgb(189, 0, 0)";
    ctx.strokeStyle = "rgb(255, 224, 122)";
    ctx.lineWidth = CellH / 2;
    let rect = new Path2D();
    for (let i = 0; i < Food.length; i++) {
        rect.rect(Food[i].positionX, Food[i].positionY, Food[i].width, Food[i].height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
function generateWalls(amount) {
    for (let j = 0; j < amount; j++) {
        let randIndex = Math.floor(Math.random() * grid.length);
        let length = Math.floor(Math.random() * 5 + 1);
        let direction = [Math.round(Math.random()), Math.round(Math.random())];
        for (let i = 0; i < length; i++) {
            let wall = {
                positionX: grid[randIndex].positionX + (direction[0] * i) * CellW,
                positionY: grid[randIndex].positionY + (direction[1] * i) * CellH,
                class: "",
                height: CellH,
                width: CellW,
                x: grid[randIndex].x + direction[0] * i,
                y: grid[randIndex].y + direction[1] * i
            };
            Walls.push(wall);
        }
    }
}
function generateThief() {
    let randIndex = Math.floor(Math.random() * grid.length);
    let length = Math.floor(Math.random() * 5 + 1);
    let direction = [Math.round(-1 + Math.random() * 2), Math.round(-1 + Math.random() * 2)];
    for (let i = 0; i < length; i++) {
        let cell = {
            positionX: grid[randIndex].positionX + (direction[0] * i) * CellW,
            positionY: grid[randIndex].positionY + (direction[1] * i) * CellH,
            direction: direction,
            height: CellH,
            width: CellW,
            x: grid[randIndex].x + direction[0] * i,
            y: grid[randIndex].y + direction[1] * i
        };
        Thief.push(cell);
    }
}
function moveThief() {
    // Move body
    for (let i = Thief.length - 1; i > 0; i--) {
        Thief[i].x = Thief[i - 1].x;
        Thief[i].y = Thief[i - 1].y;
        Thief[i].direction = Thief[i - 1].direction;
    }
    // Move head
    const [dx, dy] = Thief[0].direction;
    Thief[0].x += dx;
    Thief[0].y += dy;
    // Update positions
    for (let i = 0; i < Thief.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[j].x == Thief[i].x && grid[j].y == Thief[i].y) {
                Thief[i].positionX = grid[j].positionX;
                Thief[i].positionY = grid[j].positionY;
            }
        }
    }
    // Optionally, change direction randomly
    if (Math.random() < 0.1) { // 10% chance to change direction each move
        Thief[0].direction = [Math.round(-1 + Math.random() * 2), Math.round(-1 + Math.random() * 2)];
    }
}
function drawThief() {
    for (let i = 0; i < Thief.length; i++) {
        let cell = Thief[i];
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
function generateBlindFood() {
    let randIndex = Math.floor(Math.random() * grid.length - 1);
    let food = {
        positionX: grid[randIndex].positionX,
        positionY: grid[randIndex].positionY,
        class: "",
        height: CellH,
        width: CellW,
        x: grid[randIndex].x,
        y: grid[randIndex].y
    };
    BlindFood.push(food);
}
function addBlindFood() {
    let randIndex = Math.floor(Math.random() * grid.length);
    let food = {
        positionX: grid[randIndex].positionX,
        positionY: grid[randIndex].positionY,
        class: "",
        height: CellH,
        width: CellW,
        x: grid[randIndex].x,
        y: grid[randIndex].y
    };
    BlindFood.push(food);
}
function drawBlindFood() {
    ctx.fillStyle = "rgb(189, 0, 0)";
    ctx.strokeStyle = "rgb(255, 224, 122)";
    ctx.lineWidth = CellH / 2;
    let rect = new Path2D();
    for (let i = 0; i < BlindFood.length; i++) {
        rect.rect(BlindFood[i].positionX, BlindFood[i].positionY, BlindFood[i].width, BlindFood[i].height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
function loadJumpscareImages() {
    for (let i = 1; i <= 3; i++) {
        let image = new Image();
        image.src = `/textures/jumpscares/jumpscare${i}.png`;
        images.push(image);
    }
}
function jumpscare() {
    let randomIndex = Math.floor(Math.random() * images.length);
    ctx.drawImage(images[randomIndex], 0, 0, canvas.width, canvas.height);
}
function checkSelfCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}
function checkWallCollision() {
    for (let wall of Walls) {
        if (snake[0].x === wall.x && snake[0].y === wall.y) {
            return true;
        }
    }
    return false;
}
function checkBoundCollision() {
    return snake[0].x < 0 || snake[0].x >= GridX || snake[0].y < 0 || snake[0].y >= GridY;
}
function gameOver() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}
function handleKeyPress(event) {
    switch (event.key) {
        case "ArrowUp":
            if (snake[0].direction !== "down")
                snake[0].direction = "up";
            break;
        case "ArrowDown":
            if (snake[0].direction !== "up")
                snake[0].direction = "down";
            break;
        case "ArrowLeft":
            if (snake[0].direction !== "right")
                snake[0].direction = "left";
            break;
        case "ArrowRight":
            if (snake[0].direction !== "left")
                snake[0].direction = "right";
            break;
    }
}
document.addEventListener("keydown", handleKeyPress);
function animate() {
    delay++;
    if (delay == 20) {
        if (viewDistance > 100) {
            viewDistance -= 2;
        }
        if (checkBoundCollision() || checkSelfCollision() || checkWallCollision()) {
            gameOver();
            return;
        }
        delay = 0;
        moveSnake();
        moveThief();
        // Check if snake's head collides with food
        if (snake[0].x === Food[0].x && snake[0].y === Food[0].y) {
            Food.pop();
            addFood();
            feedSnake();
            viewDistance = 300;
        }
        if (snake[0].x === BlindFood[0].x && snake[0].y === BlindFood[0].y) {
            BlindFood.pop();
            addBlindFood();
            feedSnake();
            jumpscare();
            viewDistance = 300;
        }
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw elements in the correct order
        drawBackground();
        drawGrid();
        drawBounds();
        drawWalls();
        drawThief();
        drawFood();
        drawBlindFood();
        drawSnake();
        drawVignette();
    }
    requestAnimationFrame(animate);
}
// Initialize the game
generateGrid(canvas.width, canvas.height, GridX, GridY);
generateBounds();
generateFood();
generateBlindFood();
generateSnake(2, 5, 5);
generateWalls(25);
generateThief();
loadJumpscareImages();
// Start the animation loop
requestAnimationFrame(animate);
