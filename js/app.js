---
---
$(function() {
	var $win, $body, $message, $board, boardSize, type, $navPlane, $navTorus, $row, check, pathSplit;
	$win = $(window);
	$body = $('body')
	$board = $('.board');
	$message = $('.message');
	boardSize = 5;
	if ($body.hasClass('torus')) {
		type = 'torus';
	} else {
		type = 'plane';
	}
	$navPlane = $('#navPlane');
	$navTorus = $('#navTorus');

	// Build the board
	for (i=0;i<boardSize;i++) {
	 	$board.append('<div class="row">');
	 	$row = $board.children().last();
		for (j=0;j<boardSize;j++) {
		 	$row.append('<div class="cell" data-r="'+i+'" data-c="'+j+'"></div>');
		}
	}

	// Size the board
	var boardSizer = function(){
		if ($win.height()>$win.width()) {
			$board.width('90%');
			$board.height($board.width());
		} else {
			$board.height('90%');
			$board.width($board.height());
		}
	};
	$win.resize(boardSizer);
	boardSizer();

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
			if (type == 'torus') {
				if ((c2===c && (Math.abs(r2-r)<2||(Math.abs(r2-r)+1)%boardSize<1))
				  ||(r2===r && (Math.abs(c2-c)<2||(Math.abs(c2-c)+1)%boardSize<1))) {
					$this.toggleClass('on');
				}				
			} else {
				if ((Math.abs(r2-r)<2 && c2===c)
				  ||(Math.abs(c2-c)<2 && r2===r)) {
					$this.toggleClass('on');
				}
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
							$message.append('<a href="javascript:void(0)" id="restart">again</a>');
							$('#restart').click(gameSet);
						}, 400);
					});
				});
			}
		}
	});

	// Clear the board
	var boardClear = function() {
		$('.cell').each(function() {
			$(this).removeClass('on');
		});
	};

	// Change type
	var toPlane = function() {
		$body.removeClass('torus');
		$navTorus.removeClass('active');
		$navPlane.addClass('active');
		type = 'plane';
		boardClear();
		gameSet();
	};
	var toTorus = function() {
		$body.addClass('torus');
		$navPlane.removeClass('active');
		$navTorus.addClass('active');
		type = 'torus';
		boardClear();
		gameSet();
	};
	$navPlane.children('a').click(function(e) {
		history.pushState(null, null, '{{ site.baseurl }}/');
		e.preventDefault();
		toPlane();
	});
	$navTorus.children('a').click(function(e) {
		history.pushState(null, null, '{{ site.baseurl }}/torus/');
		e.preventDefault();
		toTorus();
	});
	window.addEventListener("popstate", function() {
		pathSplit = location.pathname.split("/");
		pathSplit.pop();
		if (pathSplit.pop() == 'torus') {
			toTorus();
		} else {
			toPlane();
		}
	});

});
