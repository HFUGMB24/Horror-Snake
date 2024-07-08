"use strict";
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
function drawGrid(width, height, rows, cols) {
    const cellWidth = 25;
    const cellHeight = 25;
    for (let i = 0; i <= cols; i++) {
        let cell = {
            positionX: 0,
            positionY: 0,
            class: "",
            height: cellHeight,
            width: cellWidth,
        };
        ctx.fillStyle = "red";
        cell.positionX = i * cellWidth;
        let rect = new Path2D();
        rect.rect(cell.positionX, cell.positionY, cellHeight, cellWidth);
        ctx.fill(rect);
        for (let j = 0; j <= rows; j++) {
            cell.positionX = j * cellHeight;
            rect.rect(cell.positionX, cell.positionY, cellHeight, cellHeight);
            ctx.fill(rect);
            grid.push(cell);
        }
    }
}
let grid = [];
drawGrid(canvas.width, canvas.height, 20, 20);
