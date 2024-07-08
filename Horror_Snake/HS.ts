const canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

function drawGrid(width: number, height: number, rows: number, cols: number) {
    const cellWidth = 25;
    const cellHeight = 25;

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    

    for (let i = 0; i <= cols; i++) {
        let cell:cellData = {
            positionX:0,
            positionY:0,
            class:"",
            height:cellHeight,
            width:cellWidth,
        }

        cell.positionX = i * cellWidth;
        
        let rect: Path2D = new Path2D()
        rect.rect(cell.positionX, cell.positionY, cellHeight, cellWidth);
 
    }

    for (let j = 0; j <= rows; j++) {
        const y = j * cellHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    for (let i = 0; i < 400; i++){
        grid.push(
            class
        )
    }
    
}

interface cellData{
    class: string;
    positionX: number;
    positionY: number;
    height: number;
    width: number;
}

let grid: cellData[] = [];


drawGrid(canvas.width, canvas.height, 20, 20);