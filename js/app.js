$(function() {
	var on, $board, $message;
	$board = $('.board');
	$message = $('.message');
	$message.delay(600).fadeOut(300);
	for (i=0;i<4;i++) {
		for (j=0;j<4;j++) {
			on = Math.random() < 0.5 ? "" : "";
		 	$board.append('<div class="c'+on+'" data-r='+i+' data-c='+j+'></div>');
		}
	}
	$board.delay(1200).fadeIn(500);
	$('.c').click(function() {
		var $this, r, c, check;
		$this = $(this);
		r = $this.data('r');
		c = $this.data('c');
		$('.c').each(function() {
			var $this, r2, c2;
			$this = $(this);
			r2 = $this.data('r');
			c2 = $this.data('c');
			if (r2-r<2 && r-r2<2 && c2-c<2 && c-c2<2){
				$this.toggleClass('on');
			}
		});
		if (!$this.hasClass('on')) {
			check = false;
			$('.c').each(function() {
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
});
