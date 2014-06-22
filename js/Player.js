function Player() {
	return {
		loc: {
			x: 0,
			y: 15,
		},
		update: function() {
			
			/*
			player.loc.x += player.speed;

			if(player.loc.x <= 0 || player.loc.x >= 400){
				player.speed = -player.speed;
			}
			*/
		},
		speed: 5,
		draw: function(context) {
			context.fillStyle = "#ff00ff";
			context.fillRect(this.loc.x, this.loc.y, 25, 25);
		},
	}
}