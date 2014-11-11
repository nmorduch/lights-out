$(function() {
	var $win, $message, $board, $row, check;
	$win = $(window);
	$board = $('.board');
	$message = $('.message');

	// Build the board
	for (i=0;i<5;i++) {
	 	$board.append('<div class="row">');
	 	$row = $board.children().last();
		for (j=0;j<5;j++) {
		 	$row.append('<div class="cell" data-r="'+i+'" data-c="'+j+'"></div>');
		}
	}

	// Size the board
	var boardSize = function(){
		if ($win.height()>$win.width()) {
			$board.width('90%');
			$board.height($board.width());
		} else {
			$board.height('90%');
			$board.width($board.height());
		}
	};
	$win.resize(boardSize);
	boardSize();

	// Toggle a + of lights
	var lightToggle = function($cell){
		var r, c;
		r = $cell.data('r');
		c = $cell.data('c');
		$('.cell').each(function() {
			var $this, r2, c2;
			$this = $(this);
			r2 = $this.data('r');
			c2 = $this.data('c');
			if ((r2-r<2 && r-r2<2 && c2===c)||(c2-c<2 && c-c2<2 && r2===r)){
				$this.toggleClass('on');
			}
		});
	};

	// Set a game, remove message, fade in the board
	var gameSet = function() {
		$('.cell').each(function() {
			if (Math.random() < 0.5) {
				lightToggle($(this));
			}
		});
		$message.delay(500).fadeOut(300,function() {
			setTimeout(function() {
				$board.addClass('flex').fadeTo(400,1);
				$message.empty();
			}, 600);
		});
	};
	gameSet();

	// Allow game play
	$('.cell').click(function() {
		var $this = $(this);
		lightToggle($this);
		// Check if game over
		if (!$this.hasClass('on')) {
			check = false;
			$('.cell').each(function() {
				if ($(this).hasClass('on')) {
					check = true;
				}
			});
			// Fade out board
			if (check === false) {
				$board.delay(100).fadeOut(500, function() {
					$message.append('<h2>Lights Out.</h2>')
						.delay(300).fadeIn(800, function() {
						$board.removeClass('flex').css('opacity','0');
						// Allow restart
						setTimeout(function() {
							$message.append('<a href="#" id="restart">again</a>');
							$('#restart').click(gameSet);
						}, 400);
					});
				});
			}
		}
	});

});
