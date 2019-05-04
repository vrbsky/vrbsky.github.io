// Screen Size
var WIDTH = 800;
var HEIGHT = 480;
var temp = 0;
var alpha = 0;
var v1x = 0;
var v1y = 0;
var v1xp = 0;
var v1yp = 0;
var v2x = 0;
var v2y = 0;
var v2xp = 0;
var v2yp = 0;
var incX = 0;
var incY = 0;
var a1 = 0;
var a2 = 0;
var nx = 0;
var ny = 0;
var optimizedP = 0;
var grid = [];
var ast1;
var ast2;
var sizeN = 0;
var colDepthX = 0;
var colDepthY = 0;
var totDepth = 0;

var verticalMove = 0;
var horizontalMove = 0;

var GRID_SIZE = 80;
GRIDS_HORIZ = 10;
GRIDS_VERTI = 6;
FIRE_PERIOD = 300;
RADIUS = 10;
ASTEROID_LVL_COUNT = 10;
LIVES = 10;

var MathHelper = {
	clamp: function(value, min, max){
		if(value <= min) return min;
		if(value >= max) return max;
		return value;
	}
};

// RESOURCES
// ----------------------------------
var Resource = { img: {}, sfx: {}}

Resource.img.background = new Image();
Resource.img.background.src = "outer_space.jpg";
Resource.sfx.collide = new Audio();
Resource.sfx.collide.src = "collide.wav";

// ASTEROID
//---------------------------
var Asteroid = function(vx, vy, isMissle, radius) {
	//if(velocity !== undefined) this.velocity = velocity;
	//if(angle !== undefined) this.angle = angle;
	if(vx !== undefined) this.vx = vx;
	if(vy !== undefined) this.vy = vy;
	this.radius = radius;
	this.mass = 4/3*Math.PI*Math.pow(this.radius,3);
	this.x = Math.random() * WIDTH;
	this.y = Math.random() * HEIGHT;
	this.crater1x = this.x + this.radius/3*Math.random();
	this.crater1y = this.y + this.radius/3*Math.random();
	this.crater1r = this.radius/4*Math.random();
	this.crater2x = this.x - this.radius/3*Math.random();
	this.crater2y = this.y - this.radius/3*Math.random();
	this.crater2r = this.radius/4*Math.random();
	this.crater3x = this.x + this.radius/3*Math.random();
	this.crater3y = this.y - this.radius/3*Math.random();
	this.crater3r = this.radius/4*Math.random();
	if (isMissle) {
		this.radius = 3;
		this.isMissle = true;
	}
};

Asteroid.prototype = {
	x: 0,
	y: 0,
	radius: 10,
	//velocity: 10,
	//angle: 0.0,
	vx: 1,
	vy: 1,
	crater1x: 0,
	crater1y: 0,
	crater1r: 0,
	crater2x: 0,
	crater2y: 0,
	crater2r: 0,
	crater3x: 0,
	crater3y: 0,
	crater3r: 0,
	isMissle: false,
	exploded: false,

	
	render: function(context) {
		context.save();
		context.strokeStyle = "#000000";
		context.fillStyle = "#aaaaaa";
		if (this.isMissle) {
			context.fillStyle = "yellow";
			context.strokeStyle = "yellow";
		}

		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
		context.fill();
		context.stroke();
		if (!this.isMissle) {
			context.strokeStyle = "grey";
			context.fillStyle = "grey";
			context.beginPath();
			context.arc(this.crater1x, this.crater1y, this.crater1r, 0, 2*Math.PI, false);
			context.fill();
			context.stroke();
			context.beginPath();
			context.arc(this.crater2x, this.crater2y, this.crater2r, 0, 2*Math.PI, false);
			context.fill();
			context.stroke();
			context.beginPath();
			context.arc(this.crater3x, this.crater3y, this.crater3r, 0, 2*Math.PI, false);
			context.fill();
			context.stroke();
			context.restore();
		}
	},
	
	update: function(elapsedTime) {
		incX = elapsedTime * this.vx + horizontalMove*10; //add thrust
		incY = elapsedTime * this.vy + verticalMove*10;   //add thrust
		this.x += incX;
		this.y += incY;
		
		if (!this.isMissle && !this.exploded) {
		this.crater1x += incX;
		this.crater1y += incY;
		this.crater2x += incX;
		this.crater2y += incY;
		this.crater3x += incX;
		this.crater3y += incY;
		
		// Wrap asteroid when going off-screen
		if(this.x < - this.radius) {
			this.x += WIDTH + this.radius; this.crater1x += WIDTH + this.radius; this.crater2x += WIDTH + this.radius; this.crater3x += WIDTH + this.radius;
		}
		if(this.x > WIDTH + this.radius) {
			this.x -= WIDTH + this.radius; this.crater1x -= WIDTH + this.radius; this.crater2x -= WIDTH + this.radius; this.crater3x -= WIDTH + this.radius;
		}
		if(this.y < - this.radius) {
			this.y += HEIGHT + this.radius; this.crater1y += HEIGHT + this.radius; this.crater2y += HEIGHT + this.radius; this.crater3y += HEIGHT + this.radius; 
		}
		if(this.y > HEIGHT + this.radius) {
			this.y -= HEIGHT + this.radius; this.crater1y -= HEIGHT + this.radius; this.crater2y -= HEIGHT + this.radius; this.crater3y -= HEIGHT + this.radius;
		}
		} else {
			
		}
		
		
		var xPos = this.x/GRID_SIZE;
		var yPos = this.y/GRID_SIZE;
		var pos0 = translate(xPos, yPos);

		if (pos0 < 0) {
			pos0 = 0;
		}

		if (pos0 > (WIDTH/GRID_SIZE) * (HEIGHT/GRID_SIZE)) {
			pos0 = (WIDTH/GRID_SIZE) * (HEIGHT/GRID_SIZE) - 1;
		}
		
		if (!this.exploded) {
			var p = GRIDS_HORIZ*Math.floor(this.y/GRID_SIZE)+Math.floor(this.x/GRID_SIZE);
			if (p<0) p=0;
			if (p>=60) p=59;
			
			grid[Math.floor(p)].put(this);
		}
		// TODO: Rotate the asteroid
	},
	
	moveBy: function(incX, incY) {
		this.x += incX;
		this.y += incY;
		this.crater1x += incX;
		this.crater1y += incY;
		this.crater2x += incX;
		this.crater2y += incY;
		this.crater3x += incX;
		this.crater3y += incY;
	},
	
	setMovementVector: function(vx, vy) {
		this.vx = vx;
		this.vy = vy;
	}
};
function translate(x, y) {
	return HEIGHT/GRID_SIZE*y + x;
}
var GridBox = function () {
	this.box = [];
};
GridBox.prototype = {
	box: [],
	put: function(asteroid) {
		this.box.push(asteroid);
	},
	pop: function() {
		this.box.pop();
	},
	length: function() {
		return this.box.length;
	},
	get: function(i) {
		return this.box[i];
	},
	};

var Asteroids = function (canvasId) {
  var myself = this;
  
  // Rendering variables
	this.frontBuffer = document.getElementById(canvasId);
	this.frontBufferContext = this.frontBuffer.getContext('2d');
  	this.backBuffer = document.createElement('canvas');
	this.backBuffer.width = this.frontBuffer.width;
	this.backBuffer.height = this.frontBuffer.height;
  	this.backBufferContext = this.backBuffer.getContext('2d');
  
  // Game variables
  this.asteroids = [];
  this.level = 1;
  this.lives = LIVES;
  this.score = 0;
  this.explodedAsteroidsCnt = 0;
  this.gameOver = false;
	
  // Timing variables
  this.startTime = 0;
  this.lastTime = 0;
  this.gameTime = 0;
  this.fps = 0;
  this.STARTING_FPS = 60;

   // Pausing variables
  this.paused = false;
  this.startedPauseAt = 0;
  this.PAUSE_TIMEOUT = 100;
  
  this.shootingAngle = 0;
  this.shootingTimer = 0;
  this.rotation = 0; //0 -still, 1 -left, -1 -right

  
  
  window.addEventListener("blur", function( event) {
    myself.paused = true;
  });
}
	
Asteroids.prototype = {

	update: function(elapsedTime) {
		for (var i=0;i<GRIDS_VERTI*GRIDS_HORIZ;i++) {
			for (var j=grid[i].length()-1;j>=0;j--) {
				grid[i].pop();
			}
		}
		// Update asteroids
		this.asteroids.forEach( function(asteroid) {
			asteroid.update(elapsedTime);
		});
		
		this.shootingAngle += this.rotation*elapsedTime*0.001*Math.PI;
		while (this.shootingAngle > 2*Math.PI) this.shootingAngle -= 2*Math.PI;
		while (this.shootingAngle < 0)         this.shootingAngle += 2*Math.PI;
		
		this.shootingTimer += elapsedTime;
		if (this.shootingTimer >= FIRE_PERIOD) {
		var missle = new Asteroid(Math.cos(this.shootingAngle), Math.sin(this.shootingAngle), true, 5);
		missle.x=400;
		missle.y=240;
		missle.isMissle = true;
		this.asteroids.push(missle);
		this.shootingTimer -= FIRE_PERIOD;
		}
		
		// TODO: handle asteroid collisions
		for (var g = 0; g<grid.length; g++) {
		  //console.log(grid[g].length()-1);
		  for (var i = grid[g].length()-1; i>=0; i--) {
			if (!grid[g].get(i).isMissle && Math.pow(grid[g].get(i).x-400,2)+Math.pow(grid[g].get(i).y-240,2)<=1600) {
				if (!this.gameOver && !this.paused) Resource.sfx.collide.play();
				grid[g].get(i).x=-100;
				grid[g].get(i).y=-100;
				grid[g].get(i).velocity=0;
				grid[g].get(i).exploded = true;
				this.explodedAsteroidsCnt++;
				this.lives--;
				if (this.lives<1) this.gameOver = true;
				if (this.explodedAsteroidsCnt >=ASTEROID_LVL_COUNT*this.level) {
					this.level++;
					this.lives++;
					this.explodedAsteroidsCnt = 0;
					this.beginLevel();
				}
				continue;
			}
						
			for (var j = 0; j<i; j++) { 							//check this box
				this.checkCollisions(g,i,g,j);
			}
			
			if (g+1<grid.length) {
				for (var j = 0; j<grid[g+1].length(); j++) { 		//check right box
					this.checkCollisions(g,i,g+1,j);
				}
			}
			
			if (g+WIDTH<grid.length) {
				for (var j = 0; j<grid[g+WIDTH].length(); j++) { 	//check down box
					this.checkCollisions(g,i,g+WIDTH,j);
				}
			}
			
			if (g+WIDTH+1<grid.length) {
				for (var j = 0; j<grid[g+WIDTH+1].length(); j++) { 	//check right-down box
					this.checkCollisions(g,i,g+WIDTH+1,j);
				}
			}			
			grid[g].pop();
		  }
		}
	},
	
	checkCollisions: function(gi,i,gj,j) {
				ast1 = grid[gi].get(i);
				ast2 = grid[gj].get(j);
					
				if (Math.pow(ast1.x-ast2.x,2)+Math.pow(ast1.y-ast2.y,2)<=Math.pow(ast1.radius+ast2.radius,2)) {
				nx = ast1.x - ast2.x;
				ny = ast1.y - ast2.y;
				//get stuck asteroids away from each other
				if (Math.pow(ast1.x-ast2.x,2)+Math.pow(ast1.y-ast2.y,2)<Math.pow(ast1.radius+ast2.radius,2)-1) {
						totDepth = (ast1.radius+ast2.radius)-Math.sqrt(Math.pow(ast1.x-ast2.x,2)+Math.pow(ast1.y-ast2.y,2));
						colDepthX = totDepth*(nx)/(ny);
						colDepthY = totDepth*(ny)/(nx);
						ast1.moveBy(colDepthX/2,colDepthY/2);
						ast2.moveBy(-colDepthX/2,-colDepthY/2);
					}
					
					//console.log("crash "+i+" at " + grid[gj].get(i).angle + " and "+j);
					if (!this.gameOver && !this.paused) Resource.sfx.collide.play();
					if (ast1.isMissle) {
						ast2.x=-100;
						ast2.y=-100;
						ast2.velocity=0;
						ast2.exploded = true;
						ast1.x=-100;
						ast1.y=-100;
						ast1.velocity=0;
						ast1.exploded=true;
						this.score++;
						this.explodedAsteroidsCnt++;
						if (this.explodedAsteroidsCnt >=ASTEROID_LVL_COUNT*this.level) {
							this.level++;
							this.lives++;
							this.explodedAsteroidsCnt = 0;
							this.beginLevel();
						}
					} else if (ast2.isMissle) {
						ast1.x=-100;
						ast1.y=-100;
						ast1.velocity=0;
						ast1.exploded = true;
						ast2.x=-100;
						ast2.y=-100;
						ast2.velocity=0;
						ast2.exploded=true;
						this.score++;
						this.explodedAsteroidsCnt++;
						if (this.explodedAsteroidsCnt >=ASTEROID_LVL_COUNT*this.level) {
							this.level++;
							this.lives++;
							this.explodedAsteroidsCnt = 0;
							this.beginLevel();
						}
					} else {
 						//pre-collision vectors
 						v1x = ast1.vx;
 						v1y = ast1.vy;
 						v2x = ast2.vx;
 						v2y = ast2.vy;
 						
 						
 						//with help from page http://www.gamasutra.com/view/feature/131424/pool_hall_lessons_fast_accurate_.php?page=3
 						//i was trying to get the physics part right.
 						//the result is not very pleasing. But at least the vectors are well behaved
 						//and don't increase their sizes
 						// First, find the normalized vector n from the center of 
						// circle1 to the center of circle2
						//Vector n = circle1.center - circle2.center;
						//normalized vector
// 						nx = ast1.x - ast2.x;
// 						ny = ast1.y - ast2.y;
						sizeN = Math.sqrt(10000*nx*nx+10000*ny*ny)/100;
						//normalize n
						nx = 100000*nx/sizeN/100000;
						ny = 100000*ny/sizeN/100000;
						// Find the length of the component of each of the movement
						// vectors along n. 
						// a1 = v1 . n
						// a2 = v2 . n
						a1 = 100000*v1x*nx/100000 + 100000*v1y*ny/100000;
						a2 = 100000*v2x*nx/100000 + 100000*v2y*ny/100000;
						// Using the optimized version, 
						// 		   		 2(a1 - a2)
						// optimizedP =	------------
						//				  m1 + m2
						optimizedP = (2.0 * (a1 - a2)) / (ast1.mass + ast2.mass);
						// Calculate v1', the new movement vector of circle1
						// v1' = v1 - optimizedP * m2 * n
						v1xp = 100000*v1x/100000 - 100000*optimizedP/100000 * ast2.mass * 100000*nx/100000;
						v1yp = 100000*v1y/100000 - 100000*optimizedP/100000 * ast2.mass * 100000*ny/100000;
						
						// Calculate v1', the new movement vector of circle1
						// v2' = v2 + optimizedP * m1 * n
						v1xp = 100000*v1x/100000 - 100000*optimizedP/100000 * ast1.mass * 100000*nx/100000;
						v1yp = 100000*v1y/100000 - 100000*optimizedP/100000 * ast1.mass * 100000*ny/100000;
		
						ast1.setMovementVector(v1xp, v1yp);
						ast2.setMovementVector(v2xp, v2yp);
					}
				}
	},
	
	render: function(elapsedTime) {
		var self = this;
		
	  // Clear screen
		this.backBufferContext.fillStyle = "#000";
		this.backBufferContext.fillRect(0, 0, WIDTH, HEIGHT);
		this.backBufferContext.drawImage(Resource.img.background, 0, 0);
		
		// Render asteroids
		this.asteroids.forEach( function(asteroid) {
			if(!asteroid.exploded) asteroid.render(self.backBufferContext);
		});
		
		
		if (this.lives > 2) {
			self.backBufferContext.strokeStyle = "#006000";
			self.backBufferContext.fillStyle = "#006000";
		} else if (this.lives == 2) {
			self.backBufferContext.strokeStyle = "#b04000";
			self.backBufferContext.fillStyle = "#b04000";
		} else if (this.lives == 1) {
			self.backBufferContext.strokeStyle = "#600000";
			self.backBufferContext.fillStyle = "#600000";
		} else {
			self.backBufferContext.strokeStyle = "#000000";
			self.backBufferContext.fillStyle = "#000000";
		}
		self.backBufferContext.beginPath();
		self.backBufferContext.arc(400,240,30,0,Math.PI*2,true);
		self.backBufferContext.fill();
		self.backBufferContext.strokeStyle = "#5000000";
		self.backBufferContext.fillStyle = "#500000";
		self.backBufferContext.beginPath();
		self.backBufferContext.arc(400,240,15,0,Math.PI*2,true);
		self.backBufferContext.fill();
		
		self.backBufferContext.strokeStyle = "navy";
		self.backBufferContext.fillStyle = "navy";
		self.backBufferContext.beginPath();
		self.backBufferContext.arc(400,240,9,0,Math.PI*2,true);
		self.backBufferContext.fill();
		
		self.backBufferContext.lineWidth = 10;
		self.backBufferContext.beginPath();
		self.backBufferContext.moveTo(400,240);
		self.backBufferContext.lineTo(400+30*Math.cos(this.shootingAngle),240+30*Math.sin(this.shootingAngle));
		self.backBufferContext.stroke();
		self.backBufferContext.lineWidth = 1;

		self.backBufferContext.beginPath();
		self.backBufferContext.arc(400+30*Math.cos(this.shootingAngle),240+30*Math.sin(this.shootingAngle),5,0,Math.PI*2,true);
		self.backBufferContext.fill();
		self.backBufferContext.stroke();

		
		// Render GUI
		if(this.gameOver){
			this.renderGuiText("Game Over", 380, 220);
			this.renderGuiText("Press [enter] for new game", 300, 260);
		}
		else if(this.paused) {
			this.renderGuiText("Paused", 380, 170);
			this.renderGuiText("Press [space] to continue", 300, 260);
		}
		if(this.displayLevel) {
			this.renderGuiText("Level " + this.level, 380, 110);
		}
		this.renderGuiText("Lives: " + this.lives + " Score: " + this.score, 600, 20);
		this.frontBufferContext.drawImage(this.backBuffer, 0, 0);
	},
	
	renderGuiText: function(message, x, y){
		this.backBufferContext.save();
		this.backBufferContext.font = "20px Arial";
		this.backBufferContext.fillStyle = "#ffffff";
		this.backBufferContext.fillText(message, x, y);
		this.backBufferContext.fillText(message, x, y);
		this.backBufferContext.restore();
	},
	
	beginLevel: function(){
	  var self = this;
		
		this.asteroids.splice(0,this.asteroids.length);
		// Create asteroids
		for(i = 0; i < this.level * ASTEROID_LVL_COUNT; i++) {
		  this.asteroids.push( new Asteroid(
		    	//Math.random() * 0.05 * this.level,
				//Math.random() * 2 * Math.PI,
				(-0.5+Math.random())*0.1*this.level,
				(-0.5+Math.random())*0.1*this.level,
				false,
				RADIUS
			));
		}
		
		// Display level in GUI temporarily
		this.displayLevel = true;
		setTimeout(function(){self.displayLevel = false;}, 3000);
	},
	
	keyDown: function(e)
	{
		switch(e.keyCode){
		  case 13: // ENTER
			  if(game.gameOver) {
					this.level = 1;
					this.score = 0;
					this.lives = LIVES;
					this.explodedAsteroidsCnt = 0;
					this.beginLevel();
					this.gameOver = false;
				}
				break;
			case 32: // SPACE
				this.paused = !this.paused;
				break;
			case 37: // <-
				this.rotation = -1;
				break;
			case 39: // ->
				this.rotation = 1;
				break;
				
			//thrust moves the world around
			case 87: // W
				verticalMove = 1;
				break;
			case 83: // S
				verticalMove = -1;
				break;
			case 65: // A
				horizontalMove = 1;
				break;
			case 68: // D
				horizontalMove = -1;
				break;
		}
	},
	
	keyUp: function(e)
	{
		switch(e.keyCode){
		 	case 37: // <-
				this.rotation = 0;
				break;
			case 39: // ->
				this.rotation = 0;
				break;
			case 87: // W
				verticalMove = 0;
				break;
			case 83: // S
				verticalMove = 0;
				break;
			case 65: // A
				horizontalMove = 0;
				break;
			case 68: // D
				horizontalMove = 0;
				break;
		}
	},
	
	
	start: function() {
		var self = this;
    
    	
		window.onkeydown = function (e) { self.keyDown(e); };
		window.onkeyup = function (e) { self.keyUp(e); };
		this.beginLevel();
		this.gameOver = false;
		this.startTime = Date();
				
		window.requestNextAnimationFrame(
			function(time) {
				self.loop.call(self, time);
			}
		);
	},
	
	loop: function(time) {
		var self = this;
		
		if(this.paused || this.gameOver) this.lastTime = time;
		var elapsedTime = time - this.lastTime; 
		this.lastTime = time;
		
		self.update(elapsedTime);
		self.render(elapsedTime);
			
		if (this.paused || this.gameOver) {
			 // In PAUSE_TIMEOUT (100) ms, call this method again to see if the game
			 // is still paused. There's no need to check more frequently.
			 
			 setTimeout( function () {
					window.requestNextAnimationFrame(
						 function (time) {
								self.loop.call(self, time);
						 });
			 }, this.PAUSE_TIMEOUT);
             
		}	else {
			
			window.requestNextAnimationFrame(
				function(time){
					self.loop.call(self, time);
				}
			);
		}
	}
}

for (var i=0;i<GRIDS_VERTI*GRIDS_HORIZ;i++) {
	grid.push(new GridBox());
}
var game = new Asteroids('myCanvas');
console.log(game);
game.start();