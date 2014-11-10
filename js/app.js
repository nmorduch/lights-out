$(function() {
	var $win, $message, $board, $row, on;
	$win = $(window);
	$board = $('.board');
	$message = $('.message');
	for (i=0;i<5;i++) {
	 	$board.append('<div class="row">');
	 	$row = $board.children().last();
		for (j=0;j<5;j++) {
			on = Math.random() < 0.5 ? " on" : "";
		 	$row.append('<div class="cell'+on+'" data-r="'+i+'" data-c="'+j+'"></div>');
		}
	}
	$message.delay(600).fadeOut(300,function() {
		setTimeout(function() {
			$board.addClass('flex').fadeTo(400,1);
		}, 600);
	});
	$('.cell').click(function() {
		var $this, r, c, check;
		$this = $(this);
		r = $this.data('r');
		c = $this.data('c');
		$('.cell').each(function() {
			var $this, r2, c2;
			$this = $(this);
			r2 = $this.data('r');
			c2 = $this.data('c');
			if ((r2-r<2 && r-r2<2 && c2===c)||(c2-c<2 && c-c2<2 && r2===r)){
				$this.toggleClass('on');
			}
		});
		if (!$this.hasClass('on')) {
			check = false;
			$('.cell').each(function() {
				if ($(this).hasClass('on')) {
					check = true;
				}
			});
			if (check === false) {
				$board.delay(100).fadeOut(500);
				$message.text('Lights Out.').delay(800).fadeIn(800);
			}
		}
	});
	var boardSize = function(){
		if ($win.height()>$win.width()) {
			$board.height($board.width());
		} else {
			$board.height('90%');
			$board.width($board.height());
		}
	};
	$win.resize(boardSize);
	boardSize();
});
