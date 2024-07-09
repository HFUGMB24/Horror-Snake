const canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

interface CellData {
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
    //draw light
    ctx.globalCompositeOperation = "lighten";

    let gradient = ctx.createRadialGradient(snake[0].positionX + CellW / 2, snake[0].positionY + CellH / 2, 0, snake[0].positionX + CellW / 2, snake[0].positionY + CellH / 2, viewDistance);
    gradient.addColorStop(0, "rgba(226, 216, 182, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

    ctx.fillStyle = gradient;
    let vignette: Path2D = new Path2D();
    vignette.rect(0, 0, canvas.width, canvas.height);

    ctx.fill(vignette);

    //draw darkness
    ctx.globalCompositeOperation = "source-over";

    gradient = ctx.createRadialGradient(snake[0].positionX + CellW / 2, snake[0].positionY + CellH / 2, 0, snake[0].positionX + CellW / 2, snake[0].positionY + CellH / 2, viewDistance);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");

    ctx.fillStyle = gradient;
    vignette.rect(0, 0, canvas.width, canvas.height);

    ctx.fill(vignette);
}



function generateGrid(width: number, height: number, rows: number, cols: number) {

    for (let i = 0; i <= cols - 1; i++) {

        let x = i * CellW;

        for (let j = 0; j <= rows - 1; j++) {

            let y = j * CellH;

            let cell: CellData = {
                positionX: x,
                positionY: y,
                class: "",
                height: CellH,
                width: CellW,
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
                    direction: "right",
                    positionX: posX,
                    positionY: posY,
                    height: CellH,
                    width: CellW,
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

function feedSnake() {
    // Add a new segment at the same position as the tail
    let tail = snake[snake.length - 1];
    let newSegment: SnakeCellData = {
        direction: tail.direction,
        positionX: tail.positionX,
        positionY: tail.positionY,
        height: CellH,
        width: CellW,
        isTop: false,
        x: tail.x,
        y: tail.y
    };
    snake.push(newSegment);
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        let cell = snake[i];
        let posX = 0;
        let posY = 0;

        ctx.fillStyle = "rgb(81, 50, 31)";
        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.lineWidth = 1;

        let rect: Path2D = new Path2D()

        for (let j = 0; j < grid.length; j++) {
            if (grid[j].x == cell.x && grid[j].y == cell.y) {
                posX = grid[j].positionX;
                posY = grid[j].positionY;
            }
        }
        rect.rect(posX, posY, cell.width, cell.height);

        ctx.fill(rect);
        ctx.stroke(rect);
    }
}

function moveSnake() {
    // Move body
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
        snake[i].direction = snake[i - 1].direction;
    }

    // Move head
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

    // Update positions
    for (let i = 0; i < snake.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[j].x == snake[i].x && grid[j].y == snake[i].y) {
                snake[i].positionX = grid[j].positionX;
                snake[i].positionY = grid[j].positionY;
            }
        }
    }
}


function generateBounds() {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].x == GridX - 1 || grid[i].x == 0 || grid[i].y == GridY - 1 || grid[i].y == 0) {
            let cell: CellData = {
                positionX: grid[i].positionX,
                positionY: grid[i].positionY,
                class: "",
                height: CellH,
                width: CellW,
                x: grid[i].x,
                y: grid[i].y
            };
            Bounds.push(cell);
        }
    }
}

function drawBounds() {

    ctx.fillStyle = "rgb(140, 99, 99)";
    ctx.strokeStyle = "rgb(84, 84, 84)";
    ctx.lineWidth = 3;

    let rect: Path2D = new Path2D()

    for (let i = 0; i < Bounds.length; i++) {

        rect.rect(Bounds[i].positionX, Bounds[i].positionY, Bounds[i].width, Bounds[i].height);

        ctx.fill(rect);
        ctx.stroke(rect);
    }
}

function generateFood() {
    let randIndex: number = Math.floor(Math.random() * grid.length - 1);

    let food: CellData = {
        positionX: grid[randIndex].positionX,
        positionY: grid[randIndex].positionY,
        class: "",
        height: CellH,
        width: CellW,
        x: grid[randIndex].x,
        y: grid[randIndex].y
    };

    Food.push(food);

}

function addFood() {
    let randIndex: number = Math.floor(Math.random() * grid.length - 1);

    let food: CellData = {
        positionX: grid[randIndex].positionX,
        positionY: grid[randIndex].positionY,
        class: "",
        height: CellH,
        width: CellW,
        x: grid[randIndex].x,
        y: grid[randIndex].y
    };

    Food.push(food);
}

function drawFood() {

    ctx.fillStyle = "rgb(189, 0, 0)";
    ctx.strokeStyle = "rgb(255, 224, 122)";
    ctx.lineWidth = CellH / 2;

    let rect: Path2D = new Path2D();

    for (let i = 0; i < Food.length; i++) {
        rect.rect(Food[i].positionX, Food[i].positionY, Food[i].width, Food[i].height);

        ctx.fill(rect);
        ctx.stroke(rect);
    }
}

let viewDistance = 300;

let bg: Path2D = new Path2D();
bg.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fill(bg);

let grid: CellData[] = [];
let snake: SnakeCellData[] = [];
let Bounds: CellData[] = [];
let Food: CellData[] = [];

let GridY: number = 40;
let GridX: number = 40;

let CellW: number = 25;
let CellH: number = 25;

generateGrid(canvas.width, canvas.height, GridX, GridY);
generateBounds();
generateFood();
generateSnake(2, 5, 5);

let delay: number = 0;

function animate() {
    delay++
    if (delay == 20) {
        if (viewDistance > 100) {
            viewDistance -= 2;
        }

        if (snake[0].positionX < CellW || snake[0].positionX > CellW * (GridX - 1) || snake[0].positionY < CellH || snake[0].positionY > CellH * (GridY - 1)) {

        } else {
            delay = 0;

            moveSnake();

            // Check if snake's head collides with food
            if (snake[0].x === Food[0].x && snake[0].y === Food[0].y) {
                Food.pop();
                addFood();
                feedSnake();
                viewDistance = 300;
            }
            ctx.putImageData(imgData, 0, 0);
            // drawGrid();
            // drawBounds();

            drawFood();
            drawSnake();
            drawVignette();
        }


    }

    requestAnimationFrame(animate);
}

drawGrid();
drawBounds();
let imgData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

requestAnimationFrame(animate);

console.log(grid);
console.log(Bounds);