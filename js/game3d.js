var game = {
	canvas: {},
	context: {},
	font: '20pt Roboto Condensed', // default game font name
	phase: "menu",
	phases: [ "load game", "menu", "load level", "play", "win", "lost" ], // for ref. @aseaboyer
/*	keys: {
		values: [ "up", "down", 0, 1, -1 ],
		up: 'up',
		down: 'up',
		left: 'up',
		right: 'up',
	},*/
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
		
		dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
		/*		dirLight.color.setHSV( 0.1, 0.1, 1 );
				dirLight.position.set( -1, 1.75, 1 );
				dirLight.position.multiplyScalar( 50 );*/
		scene.add( dirLight );
		
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
		if(keys.getStatus('w')) {
			player.gameObject.rotation.x += (0.02 * this.time.delta);
		}
		if(keys.getStatus('s')) {
			player.gameObject.rotation.x -= (0.02 * this.time.delta);
		}
		if(keys.getStatus('a')) {
			player.gameObject.rotation.y += (0.02 * this.time.delta);
		}
		if(keys.getStatus('d')) {
			player.gameObject.rotation.y -= (0.02 * this.time.delta);
		}
		
		// Can't create 2D Text in 3D space. One solution is to position a second, GUI layer, canvas over the 3d canvas
		/*
		//console.log(this.font);
		this.context.font = this.font;
		this.context.textAlign = 'center';
		this.context.fillStyle = '#fff';
		//this.context.fillText("Test!",10,90); // not sure why we can't render text - might be an issue
		*/
	},
	draw: function() {
		//requestAnimationFrame(this.draw);
		this.context.render(game.scene, game.camera);
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

// create a keys watch list with a human readable string value system
document.addEventListener('keypress', function(e) {
	var key = e.keyCode || e.which;
	var keychar = String.fromCharCode(key);

	if(keychar == "W" || keychar == "w") { // up
		keys.set('w', 'down');
	}
	if(keychar == "A" || keychar == "a") { // left
		keys.set('a', 'down');
	}
	if(keychar == "S" || keychar == "s") { // down
		keys.set('s', 'down');
	}
	if(keychar == "D" || keychar == "d") { // right
		keys.set('d', 'down');
	}
	
}, false);
document.addEventListener('keyup', function(e) {
	var key = e.keyCode || e.which;
	var keychar = String.fromCharCode(key);
	
	if(keychar == "W" || keychar == "w") { // up
		keys.set('w', 'up');
	}
	if(keychar == "A" || keychar == "a") { // left
		keys.set('a', 'up');
	}
	if(keychar == "S" || keychar == "s") { // down
		keys.set('s', 'up');
	}
	if(keychar == "D" || keychar == "d") { // right
		keys.set('d', 'up');
	}
	
}, false);