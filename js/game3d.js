var game = {
	canvas: {},
	context: {},
	font: '20pt Roboto Condensed', // default game font name
	phase: "menu",
	phases: [ "load game", "menu", "load level", "play", "win", "lost" ], // for ref. @aseaboyer
	debug: false,
	camera: {},
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
			this.delta = diff * 0.1; // For now, it should be the portion of the second, something along the lines of 0.016
		},
	},
	init: function() {
		// set up scene
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

		var renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		// add a cube
		var geometry = new THREE.CubeGeometry(1,1,1);
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		var cube = new THREE.Mesh( geometry, material );
		scene.add( cube );

		camera.position.z = 5;
		
		game.camera = camera;
		game.scene = scene;
		
		player.gameObject = cube;
		
		game.context = renderer;
		
		this.update();
	},
	update: function() {
		this.time.update();
		
		// simple rotation animation
		player.gameObject.rotation.x += 0.01;
		player.gameObject.rotation.y += 0.01;
		
		//console.log(this.font);
		//context.font = '20pt '+this.font;
		//context.textAlign = 'center';
		//context.fillStyle = '#990000';
		//context.fillText('Hello World!', 100, 100);
	},
	draw: function() {
		//requestAnimationFrame(this.draw);
		game.context.render(game.scene, game.camera);
	},
};

var requestAnimationFrame =
	window.requestAnimationFrame || 
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || 
	window.msRequestAnimationFrame;

var player = new Player();

var keys = new Keyring();
	keys.add(new Array('w','a','s','d'));

function start() {
	game.init();
	requestAnimationFrame(animate);
}
function animate() {
    game.update();
    player.update();
	
    game.draw();
	
	requestAnimationFrame(animate);
}

window.onload = function() {
	start();
	//game.start(canvas);
}
// Game Object Creation above, as is in 2D


// add renderer
/*
function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	
	// simple rotation animation
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
}
render();*/