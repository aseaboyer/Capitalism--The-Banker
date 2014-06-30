function Player() {
	return {
		gameObject: {},
		loc: {
			x: 0,
			y: 15,
		},
		update: function() {
			//console.log(keys.name[1]);
			var dir = {
				x: ( (keys.getInt('d')) - (keys.getInt('a')) ),
				y: ( (keys.getInt('s')) - (keys.getInt('w')) ),
			};
			this.loc.x += (dir.x * game.time.delta);
			this.loc.y += (dir.y * game.time.delta);
			//console.log(dir.horz + " , " + dir.vert);
		},
		speed: 120,
		draw: function(context) {
			context.fillStyle = "#ff00ff";
			context.fillRect(this.loc.x, this.loc.y, 25, 25);
		},
		translate: function(diff) {
			console.log("Moving the player like so:");
			console.log(diff);
		},
	}
}