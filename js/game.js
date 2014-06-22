var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var requestAnimationFrame =
	window.requestAnimationFrame || 
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || 
	window.msRequestAnimationFrame;

var player = new Player();

var game = {
	canvas: {},
	context: {},
	phase: "menu",
	phases: [ "load game", "menu", "load level", "play", "win", "lost" ], // for ref. @aseaboyer
	debug: false,
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

window.onload = function() {
	start();
	//game.start(canvas);
}

canvas.addEventListener('mousemove', function(e) {
    game.cursor.x = e.clientX;
    game.cursor.y = e.clientY;
}, false);

document.addEventListener('keydown', function(e) {
	var key = e.keyCode || e.which;
	var keychar = String.fromCharCode(key);
	
	//console.log('keydown: '+keychar);
	if(keychar == "P" || keychar == "p") {
		var d = document.getElementById("debug-window");
		if (game.debug) {
			console.log("Turn off debugging");
			game.debug = false;
			d.style.display = 'none';
		} else {
			console.log("Turn on debugging");
			game.debug = true;
			d.style.display = 'block';
		}
	}
	
}, false);

// create a keys watch list with a human readable string value system