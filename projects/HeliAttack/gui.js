// GUI class
//----------------------------------
// Screen Size
var WIDTH = 800;
var HEIGHT = 480;
var GUI = function(game) {
	this.game = game;
	this.heart = new Image();
	this.heart.src = "heart.jpg"; //33wide, 30high
	this.missile = new Image();
	this.missile.src = "missile.jpg"; //18wide, 44high
	this.sprite_sheet = new Image();
	this.sprite_sheet.src = "helicopter.png";
	var i = 0;

	// GUI panels
	this.topLeft = document.getElementById("gui-top-left");
	this.topCenter = document.getElementById("gui-top-center");
	this.topRight = document.getElementById("gui-top-right");
	this.bottomLeft = document.getElementById("gui-bottom-left");
	this.bottomCenter = document.getElementById("gui-bottom-center");
	this.bottomRight = document.getElementById("gui-bottom-right");
	
	this.render = function() {
		if(this.game.gameOver){
			this.renderGuiText("Game Over", 380, 220);
			this.renderGuiText("Press [enter] for new game", 300, 260);
		}
		else if(this.game.paused) {
			this.renderGuiText("Paused", 380, 170);
			this.renderGuiText("Press [space] to continue", 300, 260);
		}
		if(this.game.displayLevel) {
			this.renderGuiText("Level " + this.level, 380, 110);
		}
		// TODO: Render Health
		this.game.backBufferContext.save();
		this.game.backBufferContext.fillStyle="green";
		if (this.game.heli.health<40) {
			this.game.backBufferContext.fillStyle="red";
		}
		this.game.backBufferContext.fillRect(0,0,(this.game.heli.health/100)*WIDTH,10);
		this.game.backBufferContext.restore();

		// TODO: Render Lives
		for (i = 0; i < this.game.heli.lives; i++) {
			this.game.backBufferContext.drawImage(this.heart, 3,0, 29,29, 5+i*27, 15, 22, 20);
		}
		//this.renderGuiText("Lives: " + this.lives, 10, 20);
		
		// TODO: Render Missiles
		for (i = 0; i < this.game.heli.missiles; i++) {
			this.game.backBufferContext.save();
			this.game.backBufferContext.drawImage(this.sprite_sheet, 75, 56, 17, 8, 5,40+i*12, 17, 8);
			this.game.backBufferContext.restore();
			//this.game.backBufferContext.drawImage(this.missile, 0,2, 18,42, 790-i*12,15, 8, 18);
		}
		// TODO: Render Score
		this.renderGuiText("Score: " + this.game.score, 320, 30);
		////this.frontBufferContext.drawImage(this.backBuffer, 0, 0);
		

		// TODO: Render mini-map (Extra Credit)
	}
}
GUI.prototype = {
	renderGuiText: function(message, x, y){
		this.game.backBufferContext.save();
		this.game.backBufferContext.font = "20px Arial";
		this.game.backBufferContext.fillStyle = "#ffffff";
		this.game.backBufferContext.fillText(message, x, y);
		this.game.backBufferContext.fillText(message, x, y);
		this.game.backBufferContext.restore();
	}
}