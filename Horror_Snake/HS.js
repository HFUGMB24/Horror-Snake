var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var viewDistance = 100;
var playerX = 500;
var playerY = 200;
var bg = new Path2D();
bg.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fill(bg);
function drawVignette() {
    var gradient = ctx.createRadialGradient(playerX, playerY, 0, playerX, playerY, viewDistance);
    gradient.addColorStop(0.2, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = gradient;
    var vignette = new Path2D();
    vignette.rect(0, 0, canvas.width, canvas.height);
    ctx.fill(vignette);
}
var grid = [];
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
generateGrid(canvas.width, canvas.height, 18, 32);
drawGrid();
drawVignette();
console.log(grid);
