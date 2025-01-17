const canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

class SoundManager {
    private sounds:{[key:string]:
    HTMLAudioElement } = {};

    constructor() {
        this.loadSounds();
    }

    private loadSounds() {
        this.sounds['eat'] = new Audio('sounds/eat.wav');
        this.sounds['death'] = new Audio('sounds/death.wav');
        this.sounds['damage'] = new Audio('sounds/damage.wav'); 
        this.sounds['gameover'] = new Audio('sounds/gameover.wav');
        this.sounds['ghost'] = new Audio('sounds/ghost.wav');
        this.sounds['light'] = new Audio('sounds/light.wav');
        this.sounds['reset'] = new Audio('sounds/reset.wav');
        this.sounds['slow'] = new Audio('sounds/slow.wav');
        this.sounds['speed'] = new Audio('sounds/speed.wav');
        this.sounds['thunder'] = new Audio('sounds/thunder.wav');
        this.sounds['ambience_loop'] = new Audio('ambience_loop.wav');
        this.sounds['theme_loop'] = new Audio('theme_loop.wav');
        //HIER ALLE SOUNDS
    }

    play(sound:string){
        if(this.sounds[sound]){
            this.sounds[sound].play();
        } else {
            console.warn(`Sound "${sound}" not found.`);
        }
    }

    setVolume(sound: string, volume: number) {
        if (this.sounds[sound]) {
            this.sounds[sound].volume = volume;
        } else {
            console.warn(`Sound "${sound}" not found.`);
        }
    }
}
const soundManager = new SoundManager();


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

interface ThiefCellData {
    direction: number[];
    positionX: number;
    positionY: number;
    height: number;
    width: number;
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

// function drawBackground() {
//     const backgroundImage = new Image();
//     backgroundImage.src = 'textures/level/background.png';
//     backgroundImage.onload = () => {
//         ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
//     };
// }

//check for keyinputs
window.addEventListener("keypress", _event => {
    switch (_event.key) {
        case "w":
            if (snake[0].direction != "down") {
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
        let cell: SnakeCellData = {
            direction: "right",
            positionX: (startX - i) * CellW,
            positionY: startY * CellH,
            height: CellH,
            width: CellW,
            isTop: i === 0,
            x: startX - i,
            y: startY
        };
        snake.push(cell);
    }
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

function checkPosValid(posX: number, posY: number): boolean {
    // Check if position overlaps with bounds
    if (posX < CellW || posX >= CellW * (GridX - 1) || posY < CellH || posY >= CellH * (GridY - 1)) {
        return false;
    }
    
    // Check if position overlaps with walls
    for (let i = 0; i < Walls.length; i++) {
        if (posX === Walls[i].positionX && posY === Walls[i].positionY) {
            return false;
        }
    }
    
    // Check if position overlaps with snake
    for (let i = 0; i < snake.length; i++) {
        if (posX === snake[i].positionX && posY === snake[i].positionY) {
            return false;
        }
    }
    
    return true;
}
function generateFood() {
    let validPosition = false;
    let randIndex: number = 0;
    
    //generate a valid position
    while (!validPosition) {
        randIndex = Math.floor(Math.random() * grid.length);
        validPosition = checkPosValid(grid[randIndex].positionX, grid[randIndex].positionY);
    }

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
    let validPosition = false;
    let randIndex: number = 0;

    //generate a valid position
    while (!validPosition) {
        randIndex = Math.floor(Math.random() * grid.length);
        validPosition = checkPosValid(grid[randIndex].positionX, grid[randIndex].positionY);
    }

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

//function drawFood() {
//
//    ctx.fillStyle = "rgb(189, 0, 0)";
//    ctx.strokeStyle = "rgb(255, 224, 122)";
//    ctx.lineWidth = CellH / 2;
//
//    let rect: Path2D = new Path2D();
//
//   for (let i = 0; i < Food.length; i++) {
//        rect.rect(Food[i].positionX, Food[i].positionY, Food[i].width, Food[i].height);
//
//        ctx.fill(rect);
//        ctx.stroke(rect);
//    }
//}

function drawFood() {
    const rabbit1 = new Image();
    const rabbit2 = new Image();
    rabbit1.src = 'textures/food/rabbit1.png';
    rabbit2.src = 'textures/food/rabbit2.png';

    let currentImage = rabbit1;
    let lastSwitchTime = Date.now();

function animateFood() {
    const currentTime = Date.now();
        if (currentTime - lastSwitchTime >= 500) {
            currentImage = currentImage === rabbit1 ? rabbit2 : rabbit1;
            lastSwitchTime = currentTime;
        }

        ctx.imageSmoothingEnabled = false;

        for (let i = 0; i < Food.length; i++) {
            ctx.drawImage(
                currentImage,
                0, 0, currentImage.width, currentImage.height,
                Food[i].positionX, Food[i].positionY, Food[i].width, Food[i].height
            );
        }

        requestAnimationFrame(animateFood);
    }

    rabbit1.onload = rabbit2.onload = () => {
        animateFood();
    };
}

function generateWalls(amount: number) {
    //generate n amount of walls with random orientation
    for (let j = 0; j < amount; j++) {
        let randIndex = Math.floor(Math.random() * grid.length);
        let length = Math.floor(Math.random() * 5 + 1);
        let direction = [Math.round(Math.random()), Math.round(Math.random())];

        for (let i = 0; i < length; i++) {

            let wall: CellData = {
                positionX: grid[randIndex].positionX + (direction[0] * i) * CellW,
                positionY: grid[randIndex].positionY + (direction[1] * i) * CellH,
                class: "",
                height: CellH,
                width: CellW,
                x: grid[randIndex].x + direction[0] * i,
                y: grid[randIndex].y + direction[1] * i
            };

            Walls.push(wall);
        }
    }
}

function drawWalls() {
   ctx.fillStyle = "rgb(140, 99, 99)";
  ctx.strokeStyle = "rgb(84, 84, 84)";
   ctx.lineWidth = 3;

   let rect: Path2D = new Path2D()

  for (let i = 0; i < Walls.length; i++) {

       rect.rect(Walls[i].positionX, Walls[i].positionY, Walls[i].width, Walls[i].height);

       ctx.fill(rect);
      ctx.stroke(rect);
   }
}

// function drawWalls() {
//     const wallShadowImage = new Image(0);
//     const wallImage = new Image();
    
//     wallShadowImage.src = 'textures/level/wallshadow.png';
//     wallImage.src = 'textures/level/wall.png';

//     wallShadowImage.onload = () => {
//         for (let i = 0; i < Walls.length; i++) {
//             ctx.drawImage(wallShadowImage, Walls[i].positionX, Walls[i].positionY, Walls[i].width, Walls[i].height);
//         }
        
//         wallImage.onload = () => {
//             for (let i = 0; i < Walls.length; i++) {
//                 ctx.drawImage(wallImage, Walls[i].positionX, Walls[i].positionY, Walls[i].width, Walls[i].height);
//             }
//         };
//     };
// }

function generateThief() {
    //generate a enemy snake with random length
    let randIndex = Math.floor(Math.random() * grid.length);
    let length = Math.floor(Math.random() * 5 + 1);
    let direction = [Math.round(-1 + Math.random() * 2), Math.round(-1 + Math.random() * 2)];

    for (let i = 0; i < length; i++) {
        let cell: ThiefCellData = {
            positionX: grid[randIndex].positionX + (direction[0] * i) * CellW,
            positionY: grid[randIndex].positionY + (direction[1] * i) * CellH,
            direction: direction,
            height: CellH,
            width: CellW,
            x: grid[randIndex].x + direction[0] * i,
            y: grid[randIndex].y + direction[1] * i
        };

        Thief.push(cell);
    }
}

function moveThief() {
    // Move body
    for (let i = Thief.length - 1; i > 0; i--) {
        Thief[i].x = Thief[i - 1].x;
        Thief[i].y = Thief[i - 1].y;
        Thief[i].direction = Thief[i - 1].direction;
    }

    // Move head
    const [dx, dy] = Thief[0].direction;
    Thief[0].x += dx;
    Thief[0].y += dy;

    // Update positions
    for (let i = 0; i < Thief.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[j].x == Thief[i].x && grid[j].y == Thief[i].y) {
                Thief[i].positionX = grid[j].positionX;
                Thief[i].positionY = grid[j].positionY;
            }
        }
    }

    //change direction randomly with 10% chance
    if (Math.random() < 0.1) {
        Thief[0].direction = [Math.round(-1 + Math.random() * 2), Math.round(-1 + Math.random() * 2)];
    }
}

function drawThief() {
    for (let i = 0; i < Thief.length; i++) {
        let cell = Thief[i];
        let posX = 0;
        let posY = 0;

        ctx.fillStyle = "rgb(237, 140, 140)";
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

function generateBlindFood() {
    let validPosition = false;
    let randIndex: number = 0;
    
    while (!validPosition) {
        randIndex = Math.floor(Math.random() * grid.length);
        validPosition = checkPosValid(grid[randIndex].positionX, grid[randIndex].positionY);
    }

    let food: CellData = {
        positionX: grid[randIndex].positionX,
        positionY: grid[randIndex].positionY,
        class: "",
        height: CellH,
        width: CellW,
        x: grid[randIndex].x,
        y: grid[randIndex].y
    };

    BlindFood.push(food);
}

function addBlindFood() {
    let validPosition = false;
    let randIndex: number = 0;
    
    while (!validPosition) {
        randIndex = Math.floor(Math.random() * grid.length);
        validPosition = checkPosValid(grid[randIndex].positionX, grid[randIndex].positionY);
    }

    let food: CellData = {
        positionX: grid[randIndex].positionX,
        positionY: grid[randIndex].positionY,
        class: "",
        height: CellH,
        width: CellW,
        x: grid[randIndex].x,
        y: grid[randIndex].y
    };

    BlindFood.push(food);
}

//function drawBlindFood() {
//
//    ctx.fillStyle = "rgb(189, 0, 0)";
//    ctx.strokeStyle = "rgb(255, 224, 122)";
//    ctx.lineWidth = CellH / 2;
//
//    let rect: Path2D = new Path2D();
//
//    for (let i = 0; i < BlindFood.length; i++) {
//        rect.rect(BlindFood[i].positionX, BlindFood[i].positionY, BlindFood[i].width, BlindFood[i].height);
//
//        ctx.fill(rect);
//        ctx.stroke(rect);
//    }
//}

function drawBlindFood() {
    const flash1 = new Image();
    const blind2 = new Image();
    const blind3 = new Image();
    flash1.src = 'textures/food/flash1.png';
    blind2.src = 'textures/food/flash2.png';
    blind3.src = 'textures/food/flash3.png';

    const images = [flash1, blind2, blind3, blind2];
    let currentImageIndex = 0;
    let lastSwitchTime = Date.now();

    function animateBlindFood() {
        const currentTime = Date.now();
        if (currentTime - lastSwitchTime >= 250) {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            lastSwitchTime = currentTime;
        }

        const currentImage = images[currentImageIndex];

        // Disable image smoothing
        ctx.imageSmoothingEnabled = false;

        for (let i = 0; i < BlindFood.length; i++) {
            // Draw the image using all 9 arguments of drawImage
            ctx.drawImage(
                currentImage,
                0, 0, currentImage.width, currentImage.height,  // Source rectangle
                BlindFood[i].positionX, BlindFood[i].positionY, BlindFood[i].width, BlindFood[i].height  // Destination rectangle
            );
        }

        requestAnimationFrame(animateBlindFood);
    }

    Promise.all([
        new Promise(resolve => flash1.onload = resolve),
        new Promise(resolve => blind2.onload = resolve),
        new Promise(resolve => blind3.onload = resolve)
    ]).then(() => {
        animateBlindFood();
    });
}

function loadJumpscareImages() {
    for (let i = 1; i <= 3; i++) {
        let image = new Image();
        image.src = "/textures/jumpscares/jumpscare" + i + ".png";
        images.push(image);
    }
}

function jumpscare() {
    let randomIndex = Math.floor(Math.random() * images.length);
    ctx.drawImage(images[randomIndex], 0, 0, canvas.width, canvas.height);
}

function checkObstacleCollision(): boolean {
    for (let i = 0; i < Walls.length; i++) {
        if (snake[0].x === Walls[i].x && snake[0].y === Walls[i].y) {
            return true;
        }
    }
    return false;
}

function checkSelfCollision(): boolean {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function checkThiefCollision(): boolean {
    for (let i = 1; i < Thief.length; i++) {
        if (snake[0].x === Thief[i].x && snake[0].y === Thief[i].y) {
            return true;
        }
    }
    return false;
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
let BlindFood: CellData[] = [];
let Walls: CellData[] = [];
let Thief: ThiefCellData[] = [];
let images: HTMLImageElement[] = [];

let GridY: number = 40;
let GridX: number = 40;

let CellW: number = 27;
let CellH: number = 27;

let checkIsValid: boolean = false;
let selfCollide: boolean = false;
let obstacleCollide: boolean = false;
let thiefCollide: boolean = false;

generateGrid(canvas.width, canvas.height, GridX, GridY);
generateBounds();
generateFood();
drawFood();
generateBlindFood();
drawBlindFood();
generateSnake(2, 5, 5);
generateWalls(25);
generateThief();
loadJumpscareImages();

let delay: number = 0;

function animate() {
    delay++
    if (delay == 25) {
        if (viewDistance > 100) {
            viewDistance -= 2;
        }

        moveSnake();
        moveThief();

        // Then check for collisions
        selfCollide = checkSelfCollision();
        obstacleCollide = checkObstacleCollision();
        thiefCollide = checkThiefCollision();

        //handle collisions
        if (thiefCollide || selfCollide || obstacleCollide || snake[0].positionX < CellW || snake[0].positionX >= CellW * (GridX - 1) || snake[0].positionY < CellH || snake[0].positionY >= CellH * (GridY - 1)) {
            soundManager.play('gameover')
            soundManager.setVolume('gameover', 0.5);
        } else {
            delay = 0;

            // Check if snake's head collides with food
            if (snake[0].x === Food[0].x && snake[0].y === Food[0].y) {
                Food.pop();
                addFood();
                feedSnake();
                viewDistance = 300;
                soundManager.play('eat')
                soundManager.setVolume('eat', 0.5);
            }

            if (snake[0].x === BlindFood[0].x && snake[0].y === BlindFood[0].y) {
                BlindFood.pop();
                addBlindFood();
                feedSnake();
                //jumpscare();
                viewDistance = 300;
                soundManager.play('thunder')
                soundManager.setVolume('thunder', 1);
            }
        }

        //update canvas
        ctx.putImageData(imgData, 0, 0);
        drawThief();
        drawSnake();
        drawVignette();
    }

    requestAnimationFrame(animate);
}

drawGrid();
//drawBackground();
drawBounds();
drawWalls();
let imgData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

requestAnimationFrame(animate);

console.log(grid);
console.log(Bounds);
console.log(Walls);