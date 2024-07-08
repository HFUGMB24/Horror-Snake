var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
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
generateGrid(canvas.width, canvas.height, 18, 32);
drawGrid();
console.log(grid);
