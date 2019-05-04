// Bullet class
//----------------------------------
var Bullet = function(game, x, y, angle) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.velocity = 0.8;
  this.angle = angle;
  this.valid = true;
  this.radius = 2;
};

Bullet.prototype = {
	x: 0,
	y: 0,
	velocity: 0.5,
	angle: 0,
	radius: 2,

	render: function() {
		if (this.valid) {
			this.game.backBufferContext.save();
			//this.game.backBufferContext.lineWidth = 2;
			this.game.backBufferContext.fillStyle = "black";
			this.game.backBufferContext.beginPath();
			this.game.backBufferContext.arc(this.x-this.game.screenShift,this.y,this.radius,0,2*Math.PI); //-Math.min(this.game.heli.x,200)
			this.game.backBufferContext.fill();
			this.game.backBufferContext.restore();
		}
	},

	update: function(elapsedTime) {
		//console.log("x "+this.x+" y " +this.y+" velocity " +this.velocity+" angle " +this.angle);

		this.x += this.velocity*elapsedTime*Math.cos(this.angle);
		this.y += this.velocity*elapsedTime*Math.sin(this.angle);
		for (var i = 0; i < this.game.baloons.length; i++) {
			if (this.game.baloons[i].checkCollision(this.x, this.y, this.radius)) {
				this.valid = false;
				this.x = -this.radius;
				this.y = -this.radius;
			}
		}

	},
}