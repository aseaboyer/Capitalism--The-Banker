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
	font: 'Roboto Condensed', // default game font name
	phase: "menu",
	phases: [ "load game", "menu", "load level", "play", "win", "lost" ], // for ref. @aseaboyer
	debug: false,
	time: {
		last: 0,
		current: 0,
		delta: 0,
		delta: 0,
		init: function() {
			var d = new Date();
			this.current = d.getTime();
			this.last = this.current;
		},
		update: function() {
			var d = new Date();
			if(this.last == 0) {
				this.last = d.getTime()
			} else {
				this.last = this.current;
			}
			this.current = d.getTime();
			var diff = this.current - this.last;
			this.delta = diff; // For now, it should be the portion of the second, something along the lines of 0.016
		},
	},
	init: function(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		
		this.time.init();
		
		context.font = '20pt '+this.font;
		
		this.update();
	},
	update: function() {
		this.time.update();
		
		//console.log(this.font);
		//context.font = '20pt '+this.font;
		//context.textAlign = 'center';
		context.fillStyle = '#990000';
		context.fillText('Hello World!', 100, 100);
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
    game.cursor.x = e.clientX - canvas.offsetLeft;
    game.cursor.y = e.clientY - canvas.offsetTop;
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