const canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

interface cellData {
    class: string;
    positionX: number;
    positionY: number;
    height: number;
    width: number;
    x: number;
    y: number;
}

interface SnakeCellData {
    direction: string;
    positionX: number;
    positionY: number;
    height: number;
    width: number;
    isTop: boolean;
}

function drawVignette() {
    let gradient = ctx.createRadialGradient(playerX, playerY, 0, playerX, playerY, viewDistance);
    gradient.addColorStop(0.2, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");

    ctx.fillStyle = gradient;
    let vignette: Path2D = new Path2D();
    vignette.rect(0, 0, canvas.width, canvas.height);

    ctx.fill(vignette);
}



function generateGrid(width: number, height: number, rows: number, cols: number) {
    const cellWidth = 25;
    const cellHeight = 25;

    ctx.strokeStyle = 'white';
    ctx.fillStyle = "rgb(0, 0, 0)"
    ctx.lineWidth = 1;

    for (let i = 0; i <= cols; i++) {

        let x = i * cellWidth;

        for (let j = 0; j <= rows; j++) {

            let y = j * cellHeight;

            let cell: cellData = {
                positionX: x,
                positionY: y,
                class: "",
                height: cellHeight,
                width: cellWidth,
                x: i,
                y: j
            };
            grid.push(cell);
        }
    }
}

function drawGrid() {
    for (let i = 0; i < grid.length; i++) {
        let cell = grid[i];

        let rect: Path2D = new Path2D()
        rect.rect(cell.positionX, cell.positionY, cell.width, cell.height);

        ctx.fill(rect)
        ctx.stroke(rect)
    }
}

let dierction: string = "";

window.addEventListener("keypress", _event => {
    switch (_event.key){
        case "w":
            if(dierction == "down"){

            }else{
                dierction = "up";
            }
        break;

        case "a":
            if(dierction == "right"){

            }else{
                dierction = "left";
            }
        break;

        case "s":
            if(dierction == "up"){

            }else{
                dierction = "down";
            }
        break;

        case "d":
            if(dierction == "left"){

            }else{
                dierction = "right";
            }
        break;
    }
});

function generateSnake(length: number, startX:number, startY: number){
    
    for(let i = 0; i < length; i++){
        let posX: number;
        let posY: number;

        //scan the grid Array for the position for the snake Start
        for(let i = 0; i < grid.length; i++){
            if(grid[i].x == startX && grid[i].y == startY){
                posX = grid[i].positionX;
                posY = grid[i].positionY;
            }
        }
        
        let cell: SnakeCellData = {
            direction: "left",
            positionX: posX,
            positionY: posY,
            height: 25,
            width: 25,
            isTop: false
        }
    }



    snake[0].isTop = true;
}

function drawSnake(){
    for(let i = 0; i < snake.length; i++){
        let cell = snake[i];

        ctx.fillStyle = "rgb(255, 255, 255)";

        let rect: Path2D = new Path2D()
        rect.rect(cell.positionX, cell.positionY, cell.width, cell.height);

        ctx.fill(rect)
    }
}

function moveSnake(){
    switch (dierction){
        case "left":

        break;
    }
}

let viewDistance = 100;
let playerX = 500;
let playerY = 200;

let bg: Path2D = new Path2D();
bg.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fill(bg);

let grid: cellData[] = [];
let snake: SnakeCellData[];

generateGrid(canvas.width, canvas.height, 18, 32);

function animate(){
    drawGrid();
    drawVignette();
    requestAnimationFrame(animate)
}

requestAnimationFrame(animate);

console.log(grid);