var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
function drawVignette() {
    //draw light
    ctx.globalCompositeOperation = "lighten";
    var gradient = ctx.createRadialGradient(snake[0].positionX + CellW / 2, snake[0].positionY + CellH / 2, 0, snake[0].positionX + CellW / 2, snake[0].positionY + CellH / 2, viewDistance);
    gradient.addColorStop(0, "rgba(226, 216, 182, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctx.fillStyle = gradient;
    var vignette = new Path2D();
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
    for (var i = 0; i <= cols - 1; i++) {
        var x = i * CellW;
        for (var j = 0; j <= rows - 1; j++) {
            var y = j * CellH;
            var cell = {
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
    for (var i = 0; i < grid.length; i++) {
        var cell = grid[i];
        var rect = new Path2D();
        rect.rect(cell.positionX, cell.positionY, cell.width, cell.height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
window.addEventListener("keypress", function (_event) {
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
    for (var i = 0; i < length; i++) {
        var posX = void 0;
        var posY = void 0;
        //scan the grid Array for the position for the snake Start
        for (var j = 0; j < grid.length; j++) {
            if (snake.length <= length && grid[j].x == startX + snake.length && grid[j].y == startY) {
                posX = grid[j].positionX;
                posY = grid[j].positionY;
                var cell = {
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
    // Add a new segment at the same position as the tail
    var tail = snake[snake.length - 1];
    var newSegment = {
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
    for (var i = 0; i < snake.length; i++) {
        var cell = snake[i];
        var posX = 0;
        var posY = 0;
        ctx.fillStyle = "rgb(81, 50, 31)";
        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.lineWidth = 1;
        var rect = new Path2D();
        for (var j = 0; j < grid.length; j++) {
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
    for (var i = snake.length - 1; i > 0; i--) {
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
    for (var i = 0; i < snake.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            if (grid[j].x == snake[i].x && grid[j].y == snake[i].y) {
                snake[i].positionX = grid[j].positionX;
                snake[i].positionY = grid[j].positionY;
            }
        }
    }
}
function generateBounds() {
    for (var i = 0; i < grid.length; i++) {
        if (grid[i].x == GridX - 1 || grid[i].x == 0 || grid[i].y == GridY - 1 || grid[i].y == 0) {
            var cell = {
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
    var rect = new Path2D();
    for (var i = 0; i < Bounds.length; i++) {
        rect.rect(Bounds[i].positionX, Bounds[i].positionY, Bounds[i].width, Bounds[i].height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
function generateFood() {
    var randIndex = Math.floor(Math.random() * grid.length - 1);
    var food = {
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
    var randIndex = Math.floor(Math.random() * grid.length - 1);
    var food = {
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
    var rect = new Path2D();
    for (var i = 0; i < Food.length; i++) {
        rect.rect(Food[i].positionX, Food[i].positionY, Food[i].width, Food[i].height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
function generateWalls(amount) {
    for (var j = 0; j < amount; j++) {
        var randIndex = Math.floor(Math.random() * grid.length);
        var length_1 = Math.floor(Math.random() * 5 + 1);
        var direction = [Math.round(Math.random()), Math.round(Math.random())];
        for (var i = 0; i < length_1; i++) {
            var wall = {
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
function drawWalls() {
    ctx.fillStyle = "rgb(140, 99, 99)";
    ctx.strokeStyle = "rgb(84, 84, 84)";
    ctx.lineWidth = 3;
    var rect = new Path2D();
    for (var i = 0; i < Walls.length; i++) {
        rect.rect(Walls[i].positionX, Walls[i].positionY, Walls[i].width, Walls[i].height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
function generateThief() {
    var randIndex = Math.floor(Math.random() * grid.length);
    var length = Math.floor(Math.random() * 5 + 1);
    var direction = [Math.round(-1 + Math.random() * 2), Math.round(-1 + Math.random() * 2)];
    for (var i = 0; i < length; i++) {
        var cell = {
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
    for (var i = Thief.length - 1; i > 0; i--) {
        Thief[i].x = Thief[i - 1].x;
        Thief[i].y = Thief[i - 1].y;
        Thief[i].direction = Thief[i - 1].direction;
    }
    // Move head
    var _a = Thief[0].direction, dx = _a[0], dy = _a[1];
    Thief[0].x += dx;
    Thief[0].y += dy;
    // Update positions
    for (var i = 0; i < Thief.length; i++) {
        for (var j = 0; j < grid.length; j++) {
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
    for (var i = 0; i < Thief.length; i++) {
        var cell = Thief[i];
        var posX = 0;
        var posY = 0;
        ctx.fillStyle = "rgb(81, 50, 31)";
        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.lineWidth = 1;
        var rect = new Path2D();
        for (var j = 0; j < grid.length; j++) {
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
    var randIndex = Math.floor(Math.random() * grid.length - 1);
    var food = {
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
    var randIndex = Math.floor(Math.random() * grid.length - 1);
    var food = {
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
    var rect = new Path2D();
    for (var i = 0; i < BlindFood.length; i++) {
        rect.rect(BlindFood[i].positionX, BlindFood[i].positionY, BlindFood[i].width, BlindFood[i].height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
// function checkSelfCollision(): boolean {
//     for (let i = 1; i < snake.length; i++) {
//         if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
//             return true;
//         }
//     }
//     return false;
// }
var viewDistance = 300;
var bg = new Path2D();
bg.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fill(bg);
var grid = [];
var snake = [];
var Bounds = [];
var Food = [];
var BlindFood = [];
var Walls = [];
var Thief = [];
var GridY = 40;
var GridX = 40;
var CellW = 27;
var CellH = 27;
//let selfCollide: boolean = false;
generateGrid(canvas.width, canvas.height, GridX, GridY);
generateBounds();
generateFood();
generateBlindFood();
generateSnake(2, 5, 5);
generateWalls(25);
generateThief();
var delay = 0;
function animate() {
    delay++;
    if (delay == 20) {
        if (viewDistance > 100) {
            viewDistance -= 2;
        }
        //selfCollide = checkSelfCollision();
        //check for wall collision -----------------------------------
        if ( /*selfCollide ||*/snake[0].positionX < CellW || snake[0].positionX > CellW * (GridX - 1) || snake[0].positionY < CellH || snake[0].positionY > CellH * (GridY - 1)) {
        }
        else {
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
                viewDistance = 300;
            }
            ctx.putImageData(imgData, 0, 0);
            // drawGrid();
            // drawBounds();
            drawThief();
            drawFood();
            drawBlindFood();
            drawSnake();
            //drawVignette();
        }
    }
    requestAnimationFrame(animate);
}
drawGrid();
drawBounds();
drawWalls();
var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
requestAnimationFrame(animate);
console.log(grid);
console.log(Bounds);
