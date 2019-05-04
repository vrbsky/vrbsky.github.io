// Missile class
//----------------------------------
var Missile = function(game, x, y, angle, targetX, targetY) {
  this.sprite_sheet = new Image();
  this.sprite_sheet.src = "helicopter.png";
  this.game = game;
  this.x = x;
  this.y = y;
  this.targetX = targetX;
  this.targetY = targetY;
  this.velocity = 0.25;
  this.angle = angle;
  this.exploded = 0;
  this.radius = 30;
};

Missile.prototype = {
	x: 0,
	y: 0,
	velocity: 0.5,
	angle: 0,
	radius: 20,

	render: function() {
		this.game.backBufferContext.save();
		if (this.exploded == 0) {
			//this.game.backBufferContext.translate(0, 35);
			this.game.backBufferContext.drawImage(this.sprite_sheet, 75, 56, 17, 8, this.x-this.game.screenShift-10, this.y, 17, 8);
			this.game.backBufferContext.drawImage(this.sprite_sheet, 40, 56, 15, 8, this.x-this.game.screenShift-18, this.y-1, 18, 10);
		} else if (this.exploded == 1) {
			//this.game.backBufferContext.translate(0, 35);
			this.game.backBufferContext.drawImage(this.sprite_sheet, 53, 56, 15, 8, this.x-this.game.screenShift-18, this.y-1, 18, 10);
		}
		this.game.backBufferContext.restore();
	},

	update: function(elapsedTime) {
		//console.log("x "+this.x+" y " +this.y+" velocity " +this.velocity+" angle " +this.angle);

		this.x += this.velocity*elapsedTime*Math.cos(this.angle);
		this.y += this.velocity*elapsedTime*Math.sin(this.angle);
		if (this.exploded == 1) {
			this.exploded = 2;
			for (var i = 0; i < this.game.baloons.length; i++) {
				if (this.game.baloons[i].checkCollision(this.x, this.y, this.radius)) {
					this.exploded = 1;
				}
			}
			this.x = -this.radius;
			this.y = -this.radius;
		}
		if (Math.sqrt(Math.pow(this.x - this.targetX,2)+Math.pow(this.y - this.targetY,2))<5) {
			this.exploded = 1;
		}

		for (var i = 0; i < this.game.baloons.length; i++) {
			if (this.game.baloons[i].checkCollision(this.x, this.y, 5)) {
				this.exploded = 1;
			}
		}
	},
}