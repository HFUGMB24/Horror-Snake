const canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

let viewDistance = 500;
let playerX = 1000;
let playerY = 1000;


let bg: Path2D = new Path2D();
bg.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fill(bg);

function drawVignette() {
    let gradient = ctx.createRadialGradient(playerX, playerY, 0, playerX, playerY, viewDistance);
    gradient.addColorStop(0.2, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");

    ctx.fillStyle = gradient;
    let vignette: Path2D = new Path2D();
    vignette.rect(0, 0, canvas.width, canvas.height);

    ctx.fill(vignette);
}


