"use strict";
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
function drawGrid(width, height, rows, cols) {
    const cellWidth = 25;
    const cellHeight = 25;
    ctx.strokeStyle = 'black';
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
        let rect = new Path2D();
        rect.rect(cell.positionX, cell.positionY, cellHeight, cellWidth);
    }
    for (let j = 0; j <= rows; j++) {
        const y = j * cellHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    for (let i = 0; i < 400; i++) {
        grid.push(class {
        });
    }
}
let grid = [];
drawGrid(canvas.width, canvas.height, 20, 20);
