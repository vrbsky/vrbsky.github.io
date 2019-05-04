
// Helicopter class
//----------------------------------
var Helicopter = function(game, x, y) {
  this.game = game;
  this.x = x;
	this.y = y;
  this.velocity = 1;
  this.lives = 3;
	this.health = 100;
  this.pitch_angle = 0;
	this.turret_angle = 0;
	this.missiles = 3;
	this.sprite_sheet = new Image();
	this.sprite_sheet.src = "helicopter.png";
	this.reticuleX = 0;
	this.reticuleY = 0;
	this.turretX = 0;
	this.turretY = 0;
	this.turretOffsetX = 30;
	this.turretOffsetY = 35;
};

Helicopter.prototype = {
	x: 0,
	y: 0,
	velocity: 0,
	turretScreenX: 0,
	turretScreenY: 0,
	
	render: function(context) {
		// Render helicopter with pitch angle, missiles, and targeted turret
		context.save();
		context.translate(Math.min(this.x,200), this.y);
		context.rotate(this.pitch_angle);
		context.translate(-65, -4);
		context.save();
		context.translate(90, 35);
		context.rotate(this.turret_angle-this.pitch_angle);
		context.drawImage(this.sprite_sheet, 100, 56, 25, 8, -5, 0, 25, 8);
		context.restore();
		context.drawImage(this.sprite_sheet, 0, 0, 131, 52, 0, 0, 131, 52);
		context.translate(56, 35);
		for(i = 0; i < this.missiles; i++) {
			context.translate(2,2);
		  context.drawImage(this.sprite_sheet, 75, 56, 17, 8, 0, 0, 17, 8);
		}
		context.restore();
	},
	
	update: function(elapsedTime, inputState) {
	  
		// Move the helicopter
		this.move(inputState);	
		this.turretScreenX = Math.min(this.x,200)+this.turretOffsetX;
		this.turretScreenY = this.y+this.turretOffsetY;
		this.turret_angle = Math.atan((this.turretScreenY-this.reticuleY)/(this.turretScreenX-this.reticuleX));
		if (this.reticuleX<=this.turretScreenX) this.turret_angle += Math.PI;
		// TODO: Fire weapons
		
		if (this.y>=HEIGHT-50) {

			this.pitch_angle = Math.PI*4/5;
			this.y = HEIGHT;
			this.lives--;
			this.health = 100;
			this.game.paused = true;
			this.game.beginLevel(this.lives);
		}

		if (this.health<1) {
			this.lives--;
			this.health = 100;
			this.game.beginLevel(this.lives);
		}

		for (var i = 0; i < this.game.baloons.length; i++) {
			if (this.game.baloons[i].checkCollision(this.x, this.y, 30)) {
				this.health -= 30;
			}
		}
	},
	
	move: function(inputState) {
		if(inputState.up) {
			this.y -= this.velocity * 2;
			this.y = Math.max(13,this.y);
		} else if(inputState.down) {
			this.y += this.velocity * 5;
			this.y = Math.min(HEIGHT-30,this.y);
		}
		if(inputState.left) {
			this.pitch_angle = -Math.PI/10;
			this.x -= this.velocity * 2;
			this.x = Math.max(50,this.x);
		} else if(inputState.right) {
			this.pitch_angle = Math.PI/8;
		  this.x += this.velocity * 5;
		  this.x = Math.min(13200,this.x);
		} else {
			this.pitch_angle = 0;
		}
	}
};