// Screen Size
var WIDTH = 800;
var HEIGHT = 480;

var INFO_W = 300;
var INFO_H = 480;

// Light Cycle class
//----------------------------------
var LightCycle = function(x, y, direction, color) {
  this.position = {x: x, y: y}
  this.velocity = 0.1;
  this.state = direction;  
  this.color = color;
};

LightCycle.prototype = {
	x: 0,
	y: 0,
	velocity: 0,
	
	render: function(context) {
		context.save();
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.position.x, this.position.y, 5, 0, 2*Math.PI, false);
		context.fill();
		context.restore();
	},
	
	update: function(elapsedTime) {
	
		// Cycle state
		// http://gameprogrammingpatterns.com/state.html
		switch(this.state) {
			case 'left':
				this.position.x -= elapsedTime * this.velocity;
				break;
			case 'right': 
				this.position.x += elapsedTime * this.velocity;
				break;
			case 'up':
				this.position.y -= elapsedTime * this.velocity;
				break;
			case 'down':
				this.position.y += elapsedTime * this.velocity;
				break;
		}
	},
	
	setState: function(newDirection) {	
		this.state = newDirection;
	}
};

// Game class
//----------------------------------
var Game = function (canvasId, infoGuiId) {
  var myself = this;
  
  // Rendering variables
  this.screen = document.getElementById(canvasId);
  this.screenContext = this.screen.getContext('2d');
  
  this.infoGui = document.getElementById(infoGuiId);
  this.infoGuiContext = this.infoGui.getContext('2d');
  
  // Game variables
  this.cycles = [
    new LightCycle(100, 240, 'right', 'red'),
	new LightCycle(700, 240, 'left', 'blue')
  ];
  
  this.gameOver = false;
  this.winner = 8;
  
  // Timing variables
  this.startTime = 0;
  this.lastTime = 0;
  this.gameTime = 0;
  this.fps = 0;
  lag = 0.0;
  this.STARTING_FPS = 60;
  MS_PER_UPDATE = 1000.0/60
}
	
Game.prototype = {

	// Update the game world.  See
	// http://gameprogrammingpatterns.com/update-method.html
	update: function(elapsedTime) {
		
		// update the cycles
		this.cycles.forEach( function(cycle) {
		  cycle.update(elapsedTime);
		});
		
		// check for collisions with walls
			if ((this.cycles[0].position.x < 5) || (this.cycles[0].position.x > 795) || (this.cycles[0].position.y < 5) ||  (this.cycles[0].position.y > 475)) {
				//console.log("wall hit 0 "+this.cycles[0].position.x+" "+this.cycles[0].position.y);
				this.winner = 1;
				this.gameOver = true;
				return;
			}
			if ((this.cycles[1].position.x < 5) || (this.cycles[1].position.x > 795) || (this.cycles[1].position.y < 5) ||  (this.cycles[1].position.y > 475)) {
				//console.log("wall hit 1 "+this.cycles[1].position.x+" "+this.cycles[1].position.y);
				this.winner = 0;
				this.gameOver = true;
				return;
			}
		// check for collisions between cycles
		if (Math.pow(this.cycles[0].position.x - this.cycles[1].position.x,2) + Math.pow(this.cycles[0].position.y - this.cycles[1].position.y,2) < 100) {
			//console.log("cycles hit"+this.cycles[0].position.x+" "+this.cycles[0].position.y);
			this.winner = 8;
			this.gameOver = true;
			return;
		}
		// check for collisions between cycle and light path
		var bounds0 = this.screenContext.getImageData(Math.round(this.cycles[0].position.x)-6, Math.round(this.cycles[0].position.y)-6, 12,12).data;
		var bounds1 = this.screenContext.getImageData(Math.round(this.cycles[1].position.x)-6, Math.round(this.cycles[1].position.y)-6, 12,12).data;
		
		// not checking green color value as it is not necessary for two players
		if ((this.cycles[1].state == 'up'    && (!bounds1[20] ==0 || !bounds1[22] ==0)) ||
			(this.cycles[1].state == 'left'  && (!bounds1[240]==0 || !bounds1[242]==0)) ||
			(this.cycles[1].state == 'right' && (!bounds1[284]==0 || !bounds1[286]==0)) ||
			(this.cycles[1].state == 'down'  && (!bounds1[548]==0 || !bounds1[550]==0))) {
			console.log("line hit 1 "+this.cycles[1].position.x+" "+this.cycles[1].position.y);
			this.winner = 0;
			this.gameOver = true;
		}
		if ((this.cycles[0].state == 'up'    && (!bounds0[20] ==0 || !bounds0[22] ==0)) ||
			(this.cycles[0].state == 'left'  && (!bounds0[240]==0 || !bounds0[242]==0)) ||
			(this.cycles[0].state == 'right' && (!bounds0[284]==0 || !bounds0[286]==0)) ||
			(this.cycles[0].state == 'down'  && (!bounds0[548]==0 || !bounds0[550]==0))) {
			console.log("line hit 0 "+this.cycles[0].position.x+" "+this.cycles[0].position.y);
			this.winner = 1;
			this.gameOver = true;
		}

	},
	
	render: function(elapsedTime) {
		self = this;
		
		// Render game objects
		this.cycles.forEach( function(cycle) {
			cycle.render(self.screenContext);
		});
		
		// Render GUI
		this.infoGuiContext.font = "bold 30px Arial";
	
		if (!this.gameOver) {
			this.infoGuiContext.clearRect(0,0,INFO_W,INFO_H);
  			this.infoGuiContext.fillText('Time: '+((this.lastTime+elapsedTime)/1000).toFixed(2), 5, 35);
  		} else {
  			var winnerColor = (this.winner >= 8 ? 'No' : (this.winner == 0 ? 'Red' : 'Blue'));
  			this.infoGuiContext.clearRect(0,40,INFO_W,INFO_H-40);
  			this.infoGuiContext.fillText(winnerColor+' player wins!', 5, 70);
  		}
	},
	
	keyDown: function(e)
	{
		// Cycle state is set directly
		
		switch(e.keyCode){
			case 37: // LEFT
				this.cycles[0].setState('left');
				break;
			case 38: // UP
				this.cycles[0].setState('up');
				break;
			case 39: // RIGHT
				this.cycles[0].setState('right');
				break;
			case 40: // DOWN
				this.cycles[0].setState('down');
				break;
			case 87: // W
				this.cycles[1].setState('up');
				break;
			case 65: // A
				this.cycles[1].setState('left');
				break;
			case 83: // S
				this.cycles[1].setState('down');
				break;
			case 68: // D
				this.cycles[1].setState('right');
				break;
		}
	},
	
	start: function() {
		var self = this;
    
		window.onkeydown = function (e) { self.keyDown(e); };
		
		this.startTime = Date.now();
		
		window.requestNextAnimationFrame(
			function(time) {
				self.loop.call(self, time);
			}
		);
	},
	
	
	
	// The game loop.  See
	// http://gameprogrammingpatterns.com/game-loop.html
	loop: function(time) {
 		var self = this;

// failed attempt for fixed time step
// 		if(this.paused || this.gameOver) this.lastTime = time;
//   		var elapsed = time - this.lastTime;
//  		this.lastTime = time;
//   		this.lag += elapsed;
// 
//   //processInput();
// 
//   while (lag >= MS_PER_UPDATE)
//   {
//     self.update(elapsed);
//     this.lag -= MS_PER_UPDATE;
//   }
// 
//   self.render(lag / MS_PER_UPDATE);
	
		if(this.paused || this.gameOver) this.lastTime = time;
		var elapsedTime = time - this.lastTime; 
		this.lastTime = time;
		
		self.update(elapsedTime);
		self.render(elapsedTime);
		
 		window.requestNextAnimationFrame(
 			function(time) {
 				self.loop.call(self, time);
 			}
 		);
	}
}

var game = new Game('gameScreen', 'infoGui');
console.log(game);
game.start();