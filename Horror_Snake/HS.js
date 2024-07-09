var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
function drawVignette() {
    //draw light
    ctx.globalCompositeOperation = "lighten";
    var gradient = ctx.createRadialGradient(snake[0].positionX + GridW / 2, snake[0].positionY + GridH / 2, 0, snake[0].positionX + GridW / 2, snake[0].positionY + GridH / 2, viewDistance);
    gradient.addColorStop(0, "rgba(226, 216, 182, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctx.fillStyle = gradient;
    var vignette = new Path2D();
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
    for (var i = 0; i <= cols; i++) {
        var x = i * GridW;
        for (var j = 0; j <= rows; j++) {
            var y = j * GridH;
            var cell = {
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
    var tail = snake[snake.length - 1];
    var newSegment = {
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
        height: GridH,
        width: GridW,
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
    var rect = new Path2D();
    for (var i = 0; i < Food.length; i++) {
        rect.rect(Food[i].positionX, Food[i].positionY, Food[i].width, Food[i].height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
var viewDistance = 300;
var bg = new Path2D();
bg.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fill(bg);
var grid = [];
var snake = [];
var Bounds = [];
var Food = [];
var GridY = 40;
var GridX = 40;
var GridW = 25;
var GridH = 25;
generateGrid(canvas.width, canvas.height, GridX, GridY);
generateBounds();
generateFood();
generateSnake(2, 5, 5);
var delay = 0;
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
    drawGrid();
    drawBounds();
    drawFood();
    drawSnake();
    drawVignette();
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
console.log(grid);
console.log(Bounds);
