"use strict";
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
let grid = [];
function generateGrid(width, height, rows, cols) {
    const cellWidth = 25;
    const cellHeight = 25;
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
    for (let i = 0; i < grid.length; i++) {
        let cell = grid[i];
        let rect = new Path2D();
        rect.rect(cell.positionX, cell.positionY, cell.width, cell.height);
        ctx.fill(rect);
        ctx.stroke(rect);
    }
}
generateGrid(canvas.width, canvas.height, 18, 32);
drawGrid();
console.log(grid);
