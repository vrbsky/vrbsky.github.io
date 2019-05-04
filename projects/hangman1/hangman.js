game = function() {
    var gameover = false;
	var secret = words[Math.floor( words.length * Math.random() )].toUpperCase();
	var parts = 0
	var blanks = 0

	function isLetter(character) {
		// Return true if character is a letter, false otherwise
		return character.toUpperCase() != character.toLowerCase();
	}
	
	function pickLetter(character) {
		var letterPicked = false;
		// Replace corresponding blanks with letter
		for(i=0;i<secret.length;i++) {
			if (secret[i].toLowerCase() == character.toLowerCase()) {
				$($('#word td')[i]).html(secret[i]);
				blanks -= 1;
				letterPicked = true;
			}
		}
		if (!letterPicked) { // Add to the hanged man if letter was not in word
			parts += 1;
			$('#scaffold').attr('src', 'scaffold-' + parts + '.png'); // (use the scaffold-#.png images)
		}
		// Check for victory
		if (blanks <= 0) {
			$('#status').html("You win!");
			gameover = true;
		}
		// Check for loss
		else if (parts >= 6) {
			$('#status').html("You loose! The word was "+secret);
			gameover = true;
		}
	}
	
	// set game start message
	$('#status').html("Game is on!");
  
	// clear existing secret word
	$('#word').html('');
  
	// reset picked letters
	$('.letter').removeClass('picked').off('click');

	// reset the scaffold
	$('#scaffold').attr('src', 'scaffold-0.png');
	
	// For each letter in the secret word
	for(i=0; i < secret.length; i++){
		// draw blank or special character
		if (isLetter(secret[i])) {
			$('<td>&nbsp;</td>').appendTo('#word');
			blanks += 1;
		} else {
			$('<td class="special">' + secret[i] + '</td>').appendTo('#word');
		}
	}
	
	// Add event handlers
	$('.letter').on( 'click', function() {
		if( $(this).hasClass('picked') || gameover) return;
		$(this).addClass('picked');
		pickLetter(this.id);
	});
	
	// Event handler for keypresses
	$(document).on('keypress', function() {
		var keypressed = String.fromCharCode(event.which).toUpperCase();
		if( $('#letters #' + keypressed).hasClass('picked') || gameover) return;
		$('#letters #' + keypressed).addClass('picked');
		if (isLetter(keypressed)) {
			pickLetter(keypressed);
		}
	});
}

$(function() {
	game();  
	  
	$('#restart').on( 'click', function() {
		game(); 
	});
});