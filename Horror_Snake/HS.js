var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
function drawGrid(width, height, rows, cols) {
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
            var rect = new Path2D();
            rect.rect(cell.positionX, cell.positionY, cellHeight, cellWidth);
            ctx.fill(rect);
            ctx.stroke(rect);
            grid.push(cell);
        }
    }
}
var grid = [];
drawGrid(canvas.width, canvas.height, 20, 20);
console.log(grid);
