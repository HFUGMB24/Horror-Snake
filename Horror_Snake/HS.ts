const canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

function drawGrid(width: number, height: number, rows: number, cols: number) {
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    for (let i = 0; i <= cols; i++) {
        const x = i * cellWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    for (let j = 0; j <= rows; j++) {
        const y = j * cellHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

drawGrid(canvas.width, canvas.height, 20, 20);