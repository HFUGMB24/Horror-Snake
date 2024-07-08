var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var grid = [];
function generateGrid(width, height, rows, cols) {
    var cellWidth = 25;
    var cellHeight = 25;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= cols; i++) {
        let x = i * cellWidth;
        for (let j = 0; j <= rows; j++) {
            let y = j * cellHeight;
            let cell = {
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
