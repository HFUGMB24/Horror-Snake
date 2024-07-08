const canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

function drawGrid(width: number, height: number, rows: number, cols: number) {
    const cellWidth = 25;
    const cellHeight = 25;

    ctx.strokeStyle = 'white';
    ctx.fillStyle = "rgb(0, 0, 0)"
    ctx.lineWidth = 1;



    for (let i = 0; i <= cols; i++) {

        let cell: cellData = {
            positionX: 0,
            positionY: 0,
            class: "",
            height: cellHeight,
            width: cellWidth,
        }


        cell.positionX = i * cellWidth;

        for (let j = 0; j <= rows; j++) {

            cell.positionY = j * cellHeight;

            let rect: Path2D = new Path2D()
            rect.rect(cell.positionX, cell.positionY, cellHeight, cellWidth);
            
            ctx.fill(rect)
            ctx.stroke(rect)
            grid.push(cell);
        }
    }

}

interface cellData {
    class: string;
    positionX: number;
    positionY: number;
    height: number;
    width: number;
}

let grid: cellData[] = [];


drawGrid(canvas.width, canvas.height, 20, 20);