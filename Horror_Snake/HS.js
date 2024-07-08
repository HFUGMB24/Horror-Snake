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
    ctx.strokeStyle = 'white';
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = 1;
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
    for (var i = 0; i < grid.length; i++) {
        var cell = grid[i];
        var rect = new Path2D();
        rect.rect(cell.positionX, cell.positionY, cell.width, cell.height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
var dierction = "";
window.addEventListener("keypress", function (_event) {
    switch (_event.key) {
        case "w":
            if (dierction == "down") {
            }
            else {
                dierction = "up";
            }
            break;
        case "a":
            if (dierction == "right") {
            }
            else {
                dierction = "left";
            }
            break;
        case "s":
            if (dierction == "up") {
            }
            else {
                dierction = "down";
            }
            break;
        case "d":
            if (dierction == "left") {
            }
            else {
                dierction = "right";
            }
            break;
    }
});
function generateSnake(length, startX, startY) {
    for (var i = 0; i < length; i++) {
        var posX = void 0;
        var posY = void 0;
        //scan the grid Array for the position for the snake Start
        for (var i_1 = 0; i_1 < grid.length; i_1++) {
            if (grid[i_1].x == startX && grid[i_1].y == startY) {
                posX = grid[i_1].positionX;
                posY = grid[i_1].positionY;
            }
        }
        var cell = {
            direction: "left",
            positionX: posX,
            positionY: posY,
            height: 25,
            width: 25,
            isTop: false
        };
    }
    snake[0].isTop = true;
}
function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        var cell = snake[i];
        ctx.fillStyle = "rgb(255, 255, 255)";
        var rect = new Path2D();
        rect.rect(cell.positionX, cell.positionY, cell.width, cell.height);
        ctx.fill(rect);
    }
}
function moveSnake() {
    switch (dierction) {
        case "left":
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
var snake;
generateGrid(canvas.width, canvas.height, 18, 32);
function animate() {
    drawGrid();
    drawVignette();
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
console.log(grid);
