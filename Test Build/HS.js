"use strict";
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
{
    const ctx = new (window.AudioContext || window.AudioContext)();
    let audio;
    fetch("./sounds/damage.wav");
    fetch("./sounds/eat.wav");
    fetch("./sounds/gameover.wav");
    fetch("./sounds/ghost.wav");
    fetch("./sounds/light.wav");
    fetch("./sounds/reset.wav");
    fetch("./sounds/slow.wav");
    fetch("./sounds/speed.wav");
    fetch("./sounds/thunder.wav");
    fetch("./sounds/ambience_loop.wav");
    fetch("./sounds/theme_loop.wav")
        .then((data) => data.arrayBuffer())
        .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
        .then((decodedAudio) => {
        audio = decodedAudio;
    });
    function playback() {
        const playSound = ctx.createBufferSource();
        playSound.buffer = audio;
        playSound.connect(ctx.destination);
        playSound.start(ctx.currentTime);
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
//function drawGrid() {
//    ctx.strokeStyle = 'rgb(255, 255, 255)';
//    ctx.fillStyle = "rgb(0, 0, 0)"
//    ctx.lineWidth = 1;
//
//    for (let i = 0; i < grid.length; i++) {
//        let cell = grid[i];
//
//        let rect: Path2D = new Path2D()
//        rect.rect(cell.positionX, cell.positionY, cell.width, cell.height);
//
//        ctx.fill(rect)
//        ctx.stroke(rect)
//    }
//}
function drawBackground() {
    const backgroundImage = new Image();
    backgroundImage.src = 'textures/level/background.png';
    backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
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
        let cell = {
            direction: "right",
            positionX: (startX - i) * CellW,
            positionY: startY * CellH,
            height: CellH,
            width: CellW,
            isTop: i === 0,
            x: startX - i,
            y: startY
        };
        snake.push(cell);
    }
}
function feedSnake() {
    // Add a new segment at the same position as the tail
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
function checkPosValid(posX, posY) {
    // Check if position overlaps with bounds
    if (posX < CellW || posX >= CellW * (GridX - 1) || posY < CellH || posY >= CellH * (GridY - 1)) {
        return false;
    }
    // Check if position overlaps with walls
    for (let i = 0; i < Walls.length; i++) {
        if (posX === Walls[i].positionX && posY === Walls[i].positionY) {
            return false;
        }
    }
    // Check if position overlaps with snake
    for (let i = 0; i < snake.length; i++) {
        if (posX === snake[i].positionX && posY === snake[i].positionY) {
            return false;
        }
    }
    return true;
}
function generateFood() {
    let validPosition = false;
    let randIndex = 0;
    //generate a valid position
    while (!validPosition) {
        randIndex = Math.floor(Math.random() * grid.length);
        validPosition = checkPosValid(grid[randIndex].positionX, grid[randIndex].positionY);
    }
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
    let validPosition = false;
    let randIndex = 0;
    //generate a valid position
    while (!validPosition) {
        randIndex = Math.floor(Math.random() * grid.length);
        validPosition = checkPosValid(grid[randIndex].positionX, grid[randIndex].positionY);
    }
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
//function drawFood() {
//
//    ctx.fillStyle = "rgb(189, 0, 0)";
//    ctx.strokeStyle = "rgb(255, 224, 122)";
//    ctx.lineWidth = CellH / 2;
//
//    let rect: Path2D = new Path2D();
//
//   for (let i = 0; i < Food.length; i++) {
//        rect.rect(Food[i].positionX, Food[i].positionY, Food[i].width, Food[i].height);
//
//        ctx.fill(rect);
//        ctx.stroke(rect);
//    }
//}
function drawFood() {
    const rabbit1 = new Image();
    const rabbit2 = new Image();
    rabbit1.src = 'textures/food/rabbit1.png';
    rabbit2.src = 'textures/food/rabbit2.png';
    let currentImage = rabbit1;
    let lastSwitchTime = Date.now();
    function animateFood() {
        const currentTime = Date.now();
        if (currentTime - lastSwitchTime >= 500) {
            currentImage = currentImage === rabbit1 ? rabbit2 : rabbit1;
            lastSwitchTime = currentTime;
        }
        for (let i = 0; i < Food.length; i++) {
            ctx.drawImage(currentImage, Food[i].positionX, Food[i].positionY, Food[i].width, Food[i].height);
        }
        requestAnimationFrame(animateFood);
    }
    rabbit1.onload = rabbit2.onload = () => {
        animateFood();
    };
}
function generateWalls(amount) {
    //generate n amount of walls with random orientation
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
//function drawWalls() {
//    ctx.fillStyle = "rgb(140, 99, 99)";
//   ctx.strokeStyle = "rgb(84, 84, 84)";
//    ctx.lineWidth = 3;
//
//    let rect: Path2D = new Path2D()
//
//   for (let i = 0; i < Walls.length; i++) {
//
//        rect.rect(Walls[i].positionX, Walls[i].positionY, Walls[i].width, Walls[i].height);
//
//        ctx.fill(rect);
//       ctx.stroke(rect);
//    }
//}
function drawWalls() {
    const wallShadowImage = new Image(0);
    const wallImage = new Image();
    wallShadowImage.src = 'textures/level/wallshadow.png';
    wallImage.src = 'textures/level/wall.png';
    wallShadowImage.onload = () => {
        for (let i = 0; i < Walls.length; i++) {
            ctx.drawImage(wallShadowImage, Walls[i].positionX, Walls[i].positionY, Walls[i].width, Walls[i].height);
        }
        wallImage.onload = () => {
            for (let i = 0; i < Walls.length; i++) {
                ctx.drawImage(wallImage, Walls[i].positionX, Walls[i].positionY, Walls[i].width, Walls[i].height);
            }
        };
    };
}
function generateThief() {
    //generate a enemy snake with random length
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
    //change direction randomly with 10% chance
    if (Math.random() < 0.1) {
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
    let validPosition = false;
    let randIndex = 0;
    while (!validPosition) {
        randIndex = Math.floor(Math.random() * grid.length);
        validPosition = checkPosValid(grid[randIndex].positionX, grid[randIndex].positionY);
    }
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
    let validPosition = false;
    let randIndex = 0;
    while (!validPosition) {
        randIndex = Math.floor(Math.random() * grid.length);
        validPosition = checkPosValid(grid[randIndex].positionX, grid[randIndex].positionY);
    }
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
//function drawBlindFood() {
//
//    ctx.fillStyle = "rgb(189, 0, 0)";
//    ctx.strokeStyle = "rgb(255, 224, 122)";
//    ctx.lineWidth = CellH / 2;
//
//    let rect: Path2D = new Path2D();
//
//    for (let i = 0; i < BlindFood.length; i++) {
//        rect.rect(BlindFood[i].positionX, BlindFood[i].positionY, BlindFood[i].width, BlindFood[i].height);
//
//        ctx.fill(rect);
//        ctx.stroke(rect);
//    }
//}
function drawBlindFood() {
    const flash1 = new Image();
    const blind2 = new Image();
    const blind3 = new Image();
    flash1.src = 'textures/food/flash1.png';
    blind2.src = 'textures/food/blind2.png';
    blind3.src = 'textures/food/blind3.png';
    const images = [flash1, blind2, blind3, blind2];
    let currentImageIndex = 0;
    let lastSwitchTime = Date.now();
    function animateBlindFood() {
        const currentTime = Date.now();
        if (currentTime - lastSwitchTime >= 250) {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            lastSwitchTime = currentTime;
        }
        const currentImage = images[currentImageIndex];
        for (let i = 0; i < BlindFood.length; i++) {
            ctx.drawImage(currentImage, BlindFood[i].positionX, BlindFood[i].positionY, BlindFood[i].width, BlindFood[i].height);
        }
        requestAnimationFrame(animateBlindFood);
    }
    Promise.all([
        new Promise(resolve => flash1.onload = resolve),
        new Promise(resolve => blind2.onload = resolve),
        new Promise(resolve => blind3.onload = resolve)
    ]).then(() => {
        animateBlindFood();
    });
}
function loadJumpscareImages() {
    for (let i = 1; i <= 3; i++) {
        let image = new Image();
        image.src = "/textures/jumpscares/jumpscare" + i + ".png";
        images.push(image);
    }
}
function jumpscare() {
    let randomIndex = Math.floor(Math.random() * images.length);
    ctx.drawImage(images[randomIndex], 0, 0, canvas.width, canvas.height);
}
function checkObstacleCollision() {
    for (let i = 0; i < Walls.length; i++) {
        if (snake[0].x === Walls[i].x && snake[0].y === Walls[i].y) {
            return true;
        }
    }
    return false;
}
function checkSelfCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}
function checkThiefCollision() {
    for (let i = 1; i < Thief.length; i++) {
        if (snake[0].x === Thief[i].x && snake[0].y === Thief[i].y) {
            return true;
        }
    }
    return false;
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
let BlindFood = [];
let Walls = [];
let Thief = [];
let images = [];
let GridY = 40;
let GridX = 40;
let CellW = 27;
let CellH = 27;
let checkIsValid = false;
let selfCollide = false;
let obstacleCollide = false;
let thiefCollide = false;
generateGrid(canvas.width, canvas.height, GridX, GridY);
generateBounds();
generateFood();
drawFood();
generateBlindFood();
drawBlindFood();
generateSnake(2, 5, 5);
generateWalls(25);
generateThief();
loadJumpscareImages();
let delay = 0;
function animate() {
    delay++;
    if (delay == 20) {
        if (viewDistance > 100) {
            viewDistance -= 2;
        }
        moveSnake();
        moveThief();
        // Then check for collisions
        selfCollide = checkSelfCollision();
        obstacleCollide = checkObstacleCollision();
        thiefCollide = checkThiefCollision();
        //handle collisions
        if (thiefCollide || selfCollide || obstacleCollide || snake[0].positionX < CellW || snake[0].positionX >= CellW * (GridX - 1) || snake[0].positionY < CellH || snake[0].positionY >= CellH * (GridY - 1)) {
        }
        else {
            delay = 0;
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
        }
        //update canvas
        ctx.putImageData(imgData, 0, 0);
        drawThief();
        drawSnake();
    }
    requestAnimationFrame(animate);
}
//drawGrid();
drawBackground();
drawBounds();
drawWalls();
let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
requestAnimationFrame(animate);
console.log(grid);
console.log(Bounds);
console.log(Walls);
