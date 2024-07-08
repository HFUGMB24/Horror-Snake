var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
function drawVignette() {
    var gradient = ctx.createRadialGradient(playerX, playerY, 0, playerX, playerY, viewDistance);
    gradient.addColorStop(0.2, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = gradient;
    var vignette = new Path2D();
    vignette.rect(0, 0, canvas.width, canvas.height);
    ctx.fill(vignette);
}
function generateGrid(width, height, rows, cols) {
    var cellWidth = 25;
    var cellHeight = 25;
    for (var i = 0; i <= cols; i++) {
        var x = i * cellWidth;
        for (var j = 0; j <= rows; j++) {
            var y = j * cellHeight;
            var cell = {
                positionX: x,
                positionY: y,
                class: "",
                height: cellHeight,
                width: cellWidth,
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
                    height: 25,
                    width: 25,
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
function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        var cell = snake[i];
        var posX = 0;
        var posY = 0;
        ctx.fillStyle = "rgb(255, 0, 0)";
        var rect = new Path2D();
        for (var j = 0; j < grid.length; j++) {
            if (grid[j].x == cell.x && grid[j].y == cell.y) {
                posX = grid[j].positionX;
                posY = grid[j].positionY;
            }
        }
        rect.rect(posX, posY, cell.width, cell.height);
        ctx.fill(rect);
    }
}
function moveSnake() {
    //let lastPos = snake;
    for (var i = 1; i < snake.length; i++) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
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
}
var viewDistance = 100;
var playerX = 500;
var playerY = 200;
var bg = new Path2D();
bg.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fill(bg);
var grid = [];
var snake = [];
generateGrid(canvas.width, canvas.height, 18, 32);
generateSnake(5, 5, 5);
var delay = 0;
function animate() {
    delay++;
    if (delay == 30) {
        moveSnake();
        drawGrid();
        //drawVignette();
        drawSnake();
        delay = 0;
    }
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
console.log(grid);
