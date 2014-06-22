var x =  0;
var y = 15;
var speed = 5;

function animate() {

    reqAnimFrame = window.mozRequestAnimationFrame    ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame     ||
                window.oRequestAnimationFrame
                ;

    reqAnimFrame(animate);

    x += speed;

    if(x <= 0 || x >= 475){
        speed = -speed;
    }

    draw();
}


function draw() {
    var canvas  = document.getElementById("ex1");
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, 500, 170);
    context.fillStyle = "#ff00ff";
    context.fillRect(x, y, 25, 25);
}

animate();