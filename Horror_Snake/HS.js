"use strict";
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
function drawGrid(width, height, rows, cols) {
    const cellWidth = 25;
    const cellHeight = 25;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= cols; i++) {
        let cell = {
            positionX: 0,
            positionY: 0,
            class: "",
            height: cellHeight,
            width: cellWidth,
        };
        cell.positionX = i * cellWidth;
        for (let j = 0; j <= rows; j++) {
            cell.positionY = j * cellHeight;
            let rect = new Path2D();
            rect.rect(cell.positionX, cell.positionY, cellHeight, cellWidth);
            ctx.fill(rect);
            ctx.stroke(rect);
            grid.push(cell);
        }
    }
}
let grid = [];
drawGrid(canvas.width, canvas.height, 20, 20);
