var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var requestAnimationFrame =
	window.requestAnimationFrame || 
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || 
	window.msRequestAnimationFrame;
	
var game = {
	canvas: {},
	context: {},
	phase: "menu",
	phases: [ "load game", "menu", "load level", "play", "win", "lost" ], // for ref. @aseaboyer
	init: function(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		
		this.update();
	},
	update: function() {

		player.loc.x += player.speed;

		if(player.loc.x <= 0 || player.loc.x >= 400){
			player.speed = -player.speed;
		}
		
	},
	draw: function(context) {
		context.clearRect(0, 0, this.context.canvas.height, this.context.canvas.width);
		
		context.fillStyle = "#ff00ff";
		context.fillRect(player.loc.x, player.loc.y, 25, 25);
	},
	cursor: {
		x: 0,
		y: 0,
		draw: function(context) {
			context.fillStyle = "#00ffff";
			context.fillRect(this.x, this.y, 25, 25);
		},
	},
};

var player = {
	loc: {
		x: 0,
		y: 15,
	},
	speed: 5,
};

function start() {
	game.init(canvas);
	requestAnimationFrame(animate);
}
function animate() {
    game.update();
    game.draw(context);
	
    game.cursor.draw(context);
	
	requestAnimationFrame(animate);
}

start();
//game.start(canvas);

canvas.addEventListener('mousemove', trackMouse, false);
function trackMouse(e) {
    game.cursor.x = e.clientX;
    game.cursor.y = e.clientY;
}