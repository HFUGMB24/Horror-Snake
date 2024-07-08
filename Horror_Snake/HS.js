var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var viewDistance = 500;
var playerX = 1000;
var playerY = 1000;
var bg = new Path2D();
bg.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fill(bg);
function drawVignette() {
    var gradient = ctx.createRadialGradient(playerX, playerY, 0, playerX, playerY, viewDistance);
    gradient.addColorStop(0.2, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = gradient;
    var vignette = new Path2D();
    vignette.rect(0, 0, canvas.width, canvas.height);
    ctx.fill(vignette);
}
