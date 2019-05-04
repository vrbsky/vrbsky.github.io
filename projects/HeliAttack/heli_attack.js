// Screen Size
var WIDTH = 800;
var HEIGHT = 480;
var LIVES = 3;
// Fixed time step of 1/60th a second
var TIME_STEP = 1000/60;

// Game class
//----------------------------------
var Game = function (canvasId) {
  var myself = this;
  this.background = new Image();
  this.background.src = "background.png";
    this.midground = new Image();
  this.midground.src = "midground.png";
    this.foreground = new Image();
  this.foreground.src = "foreground.png";
  // Rendering variables
  this.screen = document.getElementById(canvasId);
  this.screenContext = this.screen.getContext('2d');
  this.backBuffer = document.createElement('canvas');
	this.backBuffer.width = this.screen.width;
	this.backBuffer.height = this.screen.height;
  this.backBufferContext = this.backBuffer.getContext('2d');
  this.score = 0;

  this.bullets = [];
  this.missiles = [];
  this.baloons = [];
  this.screenShift = 0;
	
	this.inputState = {
		up: false,
		down: false,
		left: false,
		right: false	
	};
	
  // Game variables
  this.gui = new GUI(this);
  this.heli = new Helicopter(this, 50, 200);
	
	// TODO: Add enemies
  	for (var i = 0; i < 66; i++) {
  		this.baloons.push(new Baloon(this,400+200*i,50+330*Math.random()))
  	};

  // Timing variables
  this.elapsedTime = 0.0;
  this.startTime = 0;
  this.lastTime = 0;
  this.gameTime = 0;
  this.fps = 0;
  this.STARTING_FPS = 60;
  this.paused = false;
	
}
	
Game.prototype = {

	// Update the game world.  See
	// http://gameprogrammingpatterns.com/update-method.html
	update: function(elapsedTime) {
		var self = this;
		
		this.heli.update(elapsedTime, this.inputState);
		this.screenShift = Math.max(0,this.heli.x-200);
		// Update bullets and missiles
		this.bullets.forEach( function(bullet) {
			bullet.update(elapsedTime);
		});
		this.missiles.forEach( function(missile) {
			missile.update(elapsedTime);
		});
		this.baloons.forEach( function(baloon) {
			baloon.update(elapsedTime);
		});

		if (this.heli.lives<1) {
			this.gameOver = true;
		}
	},
	
	render: function(elapsedTime) {
		var self = this;
		
		// Clear the screen
		this.backBufferContext.fillRect(0, 0, WIDTH, HEIGHT);
		
		//draw backgrounds
		this.backBufferContext.save();
		//context.translate(0, this.x);
		this.backBufferContext.drawImage(this.background, Math.max(0,this.heli.x-200)*27.0/132, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
		this.backBufferContext.drawImage(this.midground, Math.max(0,this.heli.x-200)*70.0/132, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
		this.backBufferContext.drawImage(this.foreground, Math.max(0,this.heli.x-200), 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);
		this.backBufferContext.restore();



		
		// Render game objects
		this.bullets.forEach( function(bullet) {
			bullet.render();
		});
		this.missiles.forEach( function(missile) {
			missile.render();
		});
		this.baloons.forEach( function(baloon) {
			baloon.render();
		});
		this.heli.render(this.backBufferContext);

		// Render GUI
		this.gui.render();

		this.backBufferContext.save();
		this.backBufferContext.strokeStyle = "black";
		this.backBufferContext.fillStyle = "black";
		this.backBufferContext.beginPath();
		this.backBufferContext.arc(this.heli.reticuleX,this.heli.reticuleY,2,0,2*Math.PI);
		this.backBufferContext.fill();
		this.backBufferContext.save();
		this.backBufferContext.lineWidth = 2;
		this.backBufferContext.beginPath();
		this.backBufferContext.arc(this.heli.reticuleX,this.heli.reticuleY,12,0,2*Math.PI);
		this.backBufferContext.stroke();
		this.backBufferContext.restore();
		this.backBufferContext.restore();
		


		//draw minimap
		//this.backBufferContext.drawImage(this.background, Math.max(0,this.heli.x-200)*27.0/132, 0, WIDTH, HEIGHT, 0, 80, WIDTH/10, HEIGHT/10);
		//this.backBufferContext.drawImage(this.midground, Math.max(0,this.heli.x-200)*70.0/132, 0, WIDTH, HEIGHT, 0, 80, WIDTH/10, HEIGHT/10);
		var MMRATIO = 1.0*WIDTH/14000;
		var MMRATIO2 = 1.0*WIDTH/7800;
		this.backBufferContext.drawImage(this.midground, 0,0, 7800,HEIGHT,   0,HEIGHT-2/MMRATIO, WIDTH, 2/MMRATIO);
		this.backBufferContext.drawImage(this.foreground, 0,0, 14000,HEIGHT, 0,HEIGHT-2/MMRATIO, WIDTH, 2/MMRATIO);
		
		this.backBufferContext.save();
		this.backBufferContext.strokeStyle = "black";
		this.backBufferContext.beginPath();
		this.backBufferContext.rect(0,HEIGHT-HEIGHT*MMRATIO, WIDTH,HEIGHT);
		this.backBufferContext.stroke();
		this.backBufferContext.fillStyle = "grey";
		this.backBufferContext.strokeStyle = "grey";
		this.backBufferContext.beginPath();
		this.backBufferContext.arc((Math.max(0,this.heli.x-200)+Math.min(this.heli.x,200))*MMRATIO,HEIGHT-HEIGHT*MMRATIO +this.heli.y*MMRATIO,2,0,2*Math.PI);
		this.backBufferContext.fill();
		this.backBufferContext.beginPath();
		this.backBufferContext.rect(Math.max(0,this.heli.x-200)*MMRATIO,HEIGHT-HEIGHT*MMRATIO, WIDTH*MMRATIO,HEIGHT*MMRATIO);
		this.backBufferContext.stroke();

		this.backBufferContext.restore();


		// Flip buffers
		this.screenContext.drawImage(this.backBuffer, 0, 0);
	},

	beginLevel: function(lives){
	  var self = this;
		
		this.bullets.splice(0,this.bullets.length);
		this.missiles.splice(0,this.missiles.length);
		this.baloons.splice(0,this.baloons.length);
		for (var i = 0; i < 20; i++) {
  			this.baloons.push(new Baloon(this,400+200*i,50+330*Math.random()))
  		};
		
  		this.heli = new Helicopter(this, 50, 200);
  		this.heli.pitch_angle = 0;
  		this.heli.lives = lives;
  		  // Timing variables
	this.elapsedTime = 0.0;
  this.startTime = 0;
  this.lastTime = 0;
  this.gameTime = 0;
  this.fps = 0;
  this.STARTING_FPS = 60;

		// Display level in GUI temporarily
		//this.displayLevel = true;
		//setTimeout(function(){self.displayLevel = false;}, 3000);
	},
	
	keyDown: function(e)
	{
		// Cycle state is set directly 
		switch(e.keyCode){
			case 13: // ENTER
			  if(game.gameOver) {
					//this.level = 1;
					this.score = 0;
					this.gameOver = false;
					this.beginLevel(LIVES);
				}
			case 32: // SPACE
				this.paused = !this.paused;
				break;
			case 37: // LEFT
				this.inputState.left = true;
				break;
			case 38: // UP
				this.inputState.up = true;
				break;
			case 39: // RIGHT
				this.inputState.right = true;
				break;
			case 40: // DOWN
				this.inputState.down = true;
				break;
			case 65: // A
				this.inputState.left = true;
				break;
			case 87: // W
				this.inputState.up = true;
				break;
			case 68: // D
				this.inputState.right = true;
				break;
			case 83: // S
				this.inputState.down = true;
				break;
		}
	},
	
	keyUp: function(e)
	{
		// Cycle state is set directly 
		switch(e.keyCode){
			case 37: // LEFT
				this.inputState.left = false;
				break;
			case 38: // UP
				this.inputState.up = false;
				break;
			case 39: // RIGHT
				this.inputState.right = false;
				break;
			case 40: // DOWN
				this.inputState.down = false;
				break;
			case 65: // A
				this.inputState.left = false;
				break;
			case 87: // W
				this.inputState.up = false;
				break;
			case 68: // D
				this.inputState.right = false;
				break;
			case 83: // S
				this.inputState.down = false;
				break;
		}
	},

	mouseMove: function(e)
	{
		//this.screen.style.cursor = "crosshair";
		this.screen.style.cursor = "none";
		var rect = this.screen.getBoundingClientRect();
		// if (e.pageX || e.pageY) { 
		//   this.heli.reticuleX = e.pageX;
		//   this.heli.reticuleY = e.pageY;
		// }
		// else { 
		//   this.heli.reticuleX = e.clientX + this.screen.scrollLeft + this.backBuffer.scrollLeft; 
		//   this.heli.reticuleY = e.clientY + this.screen.scrollTop + this.backBuffer.scrollTop; 
		// }
		// this.heli.reticuleX -= this.backBuffer.offsetLeft;
		// this.heli.reticuleY -= this.backBuffer.offsetTop;

		this.heli.reticuleX = e.clientX - rect.left;//10;
		this.heli.reticuleY = e.clientY - rect.top;//69;
	},

	mouseDown: function(e) {
		//TODO left -> bullet, right -> missile
    	e = e || window.event;
    	var button = e.which || e.button;
    	if (button == 1) {
    		console.log("new bullet "+(this.heli.x+this.heli.turretOffsetX));
			this.bullets.push(new Bullet(this,this.heli.x+this.heli.turretOffsetX-5,this.heli.y+this.heli.turretOffsetY+1,this.heli.turret_angle));
    	} else if (button == 3 && this.heli.missiles>0) {
			console.log("new missile "+(this.heli.x+this.heli.turretOffsetX));
			this.missiles.push(new Missile(this,this.heli.x+this.heli.turretOffsetX,this.heli.y+this.heli.turretOffsetY,this.heli.turret_angle, this.screenShift+this.heli.reticuleX, this.heli.reticuleY));
			this.heli.missiles--;
		}
	},
	
	start: function() {
		var self = this;
    
		window.onkeydown = function (e) { self.keyDown(e); };
		window.onkeyup = function (e) { self.keyUp(e); };
		window.onmousemove = function (e) { self.mouseMove(e) };
		window.onmousedown = function (e) { self.mouseDown(e) };
		this.screen.oncontextmenu = function (e) { return false};
		
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
		
		// Don't advance the clock if the game is paused		
		if(this.paused || this.gameOver) this.lastTime = time;
		
		// Calculate additional elapsed time, keeping any
		// unused time from previous frame
		this.elapsedTime += time - this.lastTime; 
		this.lastTime = time;
		
		// The first timestep (and occasionally later ones) are too large
		// causing our processing to take too long (and run into the next
    // frame).  We can clamp to a max of 4 frames to keep that from 
    // happening		
		this.elapsedTime = Math.min(this.elapsedTime, 4 * TIME_STEP);
		
		// We want a fixed game loop of 1/60th a second, so if necessary run multiple
		// updates during each rendering pass
		// Invariant: We have unprocessed time in excess of TIME_STEP
		while (this.elapsedTime >= TIME_STEP) { 
			self.update(TIME_STEP);
			this.elapsedTime -= TIME_STEP;
			
			// add the TIME_STEP to gameTime
			this.gameTime += TIME_STEP;
		}
		
		// We only want to render once
		self.render(this.elapsedTime);
		
		// Repeat the game loop
		window.requestNextAnimationFrame(
			function(time) {
				self.loop.call(self, time);
			}
		);
	}
}

var game = new Game('game');
console.log(game);
game.start();