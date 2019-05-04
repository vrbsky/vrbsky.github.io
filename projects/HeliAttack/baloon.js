// Baloon class
//----------------------------------
var Baloon = function(game, x, y, angle) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.velocity = 0.8;
  this.dir = 1;
  this.count = 0;
  this.radius = 20;
  this.exploded = false;
};

Baloon.prototype = {
	x: 0,
	y: 0,
	velocity: 0.5,
	angle: 0,
	radius: 20,
	exploded: false,

	render: function() {
		if (this.exploded) return;

		this.game.backBufferContext.save();
		//this.game.backBufferContext.lineWidth = 2;
		this.game.backBufferContext.fillStyle = "yellow";
		this.game.backBufferContext.beginPath();
		this.game.backBufferContext.arc(this.x-this.game.screenShift,this.y,this.radius,0,2*Math.PI); //-Math.min(this.game.heli.x,200)
		this.game.backBufferContext.fill();
		this.game.backBufferContext.restore();
	},

	update: function(elapsedTime) {
		//console.log("x "+this.x+" y " +this.y+" velocity " +this.velocity+" angle " +this.angle);

		//this.x += this.velocity*elapsedTime*Math.cos(this.angle);
		if (this.count>80) {
			this.dir*=-1;
			this.count = 0;
		} else {
		this.count++;
		this.y += this.dir*0.2;
		}
	},

	checkCollision: function(x, y, r) {
		//console.log(x+" "+y+" "+r)
		//console.log(Math.sqrt(Math.pow(this.x - x,2)+Math.pow(this.y - y,2))+" "+(this.radius+r));
		if (!this.exploded && Math.sqrt(Math.pow(this.x - x,2)+Math.pow(this.y - y,2))<this.radius+r) {
			this.exploded = true;
			this.x = -this.radius;
			this.y = -this.radius;
			this.game.score+=10;
			return true;
		}
		return false;
	},
}