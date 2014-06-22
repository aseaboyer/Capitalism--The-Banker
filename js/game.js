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
	time: {
		last: 0,
		current: 0,
		delta: 0,
		update: function() {
			var d = new Date();
			if(this.last == 0) {
				this.last = d.getTime()
			} else {
				this.last = this.current;
			}
			this.current = d.getTime();
			this.delta = this.current - this.last;
		},
	},
	init: function(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		
		this.time.update();
		this.time.update();
		
		this.update();
	},
	update: function() {
		this.time.update();
	},
	draw: function(context) {
		context.clearRect(0, 0, this.context.canvas.height, this.context.canvas.width);
		
		// draw background and things here
	},
	cursor: {
		x: 0,
		y: 0,
		size: 25,
		draw: function(context) {
			context.fillStyle = "#00ffff";
			context.fillRect(this.x - (this.size*0.5), this.y - (this.size*0.5), this.size, this.size);
		},
	},
};

var player = {
	loc: {
		x: 0,
		y: 15,
	},
	update: function() {

		player.loc.x += player.speed;

		if(player.loc.x <= 0 || player.loc.x >= 400){
			player.speed = -player.speed;
		}
		
	},
	speed: 5,
	draw: function(context) {
		context.fillStyle = "#ff00ff";
		context.fillRect(this.loc.x, this.loc.y, 25, 25);
	},
};

function start() {
	game.init(canvas);
	requestAnimationFrame(animate);
}
function animate() {
    game.update();
    player.update();
	
    game.draw(context);
	
    player.draw(context);
	
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