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
    x: number;
    y: number;
}

function drawVignette() {
    let gradient = ctx.createRadialGradient(snake[0].x, snake[0].y, 0, snake[0].x, snake[0].y, viewDistance);
    gradient.addColorStop(0.2, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");

    ctx.fillStyle = gradient;
    let vignette: Path2D = new Path2D();
    vignette.rect(0, 0, canvas.width, canvas.height);

    ctx.fill(vignette);
}



function generateGrid(width: number, height: number, rows: number, cols: number) {

    for (let i = 0; i <= cols; i++) {

        let x = i * GridW;

        for (let j = 0; j <= rows; j++) {

            let y = j * GridH;

            let cell: cellData = {
                positionX: x,
                positionY: y,
                class: "",
                height: GridH,
                width: GridW,
                x: i,
                y: j
            };
            grid.push(cell);
        }
    }
}

function drawGrid() {

    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.fillStyle = "rgb(0, 0, 0)"
    ctx.lineWidth = 1;

    for (let i = 0; i < grid.length; i++) {
        let cell = grid[i];

        let rect: Path2D = new Path2D()
        rect.rect(cell.positionX, cell.positionY, cell.width, cell.height);

        ctx.fill(rect)
        ctx.stroke(rect)
    }
}

window.addEventListener("keypress", _event => {
    switch (_event.key) {
        case "w":
            if (snake[0].direction == "down") {

            } else {
                snake[0].direction = "up";
            }
            break;

        case "a":
            if (snake[0].direction == "right") {

            } else {
                snake[0].direction = "left";
            }
            break;

        case "s":
            if (snake[0].direction == "up") {

            } else {
                snake[0].direction = "down";
            }
            break;

        case "d":
            if (snake[0].direction == "left") {

            } else {
                snake[0].direction = "right";
            }
            break;
    }
});

function generateSnake(length: number, startX: number, startY: number) {

    for (let i = 0; i < length; i++) {
        let posX: number;
        let posY: number;

        //scan the grid Array for the position for the snake Start
        for (let j = 0; j < grid.length; j++) {
            if (snake.length <= length && grid[j].x == startX + snake.length && grid[j].y == startY) {
                posX = grid[j].positionX;
                posY = grid[j].positionY;

                let cell: SnakeCellData = {
                    direction: "left",
                    positionX: posX,
                    positionY: posY,
                    height: GridH,
                    width: GridW,
                    isTop: false,
                    x: grid[j].x,
                    y: grid[j].y
                };

                snake.push(cell);
            }
        }
    }
    snake[0].isTop = true;
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        let cell = snake[i];
        let posX = 0;
        let posY = 0;

        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.strokeStyle = "rgb(0, 0, 0)";

        let rect: Path2D = new Path2D()

        for (let j = 0; j < grid.length; j++) {
            if (grid[j].x == cell.x && grid[j].y == cell.y) {
                posX = grid[j].positionX;
                posY = grid[j].positionY;

                //snake[i].positionX = grid[j].positionX;
                //snake[i].positionY = grid[j].positionY;
            }
        }
        rect.rect(posX, posY, cell.width, cell.height);

        ctx.fill(rect);
        ctx.stroke(rect);
    }
}

function moveSnake() {
    //let lastPos = snake;
    
    for (let i = 1; i < snake.length; i++) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
    
    switch (snake[0].direction) {
        case "left":
            snake[0].x--;
            break;
        case "right":
            snake[0].x++;
            break;
        case "down":
            snake[0].y++;
            break;
        case "up":
            snake[0].y--;
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
let snake: SnakeCellData[] = [];

let GridY: number = 20;
let GridX: number = 20;

let GridW: number = 50;
let GridH: number = 50;

generateGrid(canvas.width, canvas.height, GridX, GridY);
generateSnake(5, 5, 5);

let delay: number = 0;

function animate() {
    delay++;
    if (delay == 30) {
        moveSnake();
        drawGrid();
        drawSnake();
        //drawVignette();
        delay = 0;
    }

    requestAnimationFrame(animate);

}

requestAnimationFrame(animate);

console.log(grid);