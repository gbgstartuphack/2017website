function isScrolledIntoView(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function setSpanArrow(elem) {
	if (elem.parent().css('float') == 'right') {
		elem.addClass('span-left');
		elem.removeClass('span-right');
	}
	if (elem.parent().css('float') == 'left') {
		elem.addClass('span-right');
		elem.removeClass('span-left');
	}
}

function fixFloat(elem) {
	elem[0].getElementsByClassName('people-text')[0].style.cssFloat = 'right';
	elem[0].getElementsByClassName('people-picture')[0].style.cssFloat = 'left';

	for(var i = 1; i<elem.length; i++) {
		var textOneMinus = elem[i-1].getElementsByClassName('people-text')[0];
		var pictureOneMinus = elem[i-1].getElementsByClassName('people-picture')[0];
		var text = elem[i].getElementsByClassName('people-text')[0];
		var picture = elem[i].getElementsByClassName('people-picture')[0];

		if (elem[i-1].offsetTop != elem[i].offsetTop) {
			if (textOneMinus.style.cssFloat == 'right') {
				text.style.cssFloat = 'left';
				picture.style.cssFloat = 'right';
			}
			if (textOneMinus.style.cssFloat == 'left') {
				text.style.cssFloat = 'right';
				picture.style.cssFloat = 'left';
			}
		}
		else {
			text.style.cssFloat = textOneMinus.style.cssFloat;
			picture.style.cssFloat = pictureOneMinus.style.cssFloat;
		}
	}
}

var stats;
$(document).ready(function() {
	//animate header
	$('.header-logo').animate({
		left: 0,
		opacity: 1
	}, 1000);
	$('.collaboration > *').animate({
		left: 0,
		opacity: 1
	}, 1000);
	$('.ghost-btn').animate({
		opacity: 1
	}, 1500);
	$('.header-info').animate({
		opacity: 1
	}, 1500);

	$('a[href*=#]').bind('click', function(e) {
	    e.preventDefault(); //prevent the "normal" behaviour which would be a "hard" jump
	       
	    var target = $(this).attr("href"); //Get the target
	            
	    // perform animated scrolling by getting top-position of target-element and set it as scroll target
	    $('html, body').stop().animate({ scrollTop: $(target).offset().top }, 1000);
            
    	return false;
  	});

	//pirallax
	if (window.innerWidth >= 480) {
		$(window).bind('scroll',function(e){
	   		parallaxScroll();
	   	});
	}
	else {
		$('.ocean-break img').css('left', '15vw');
	}

   	function parallaxScroll(){
   		yStart = $('.ocean-break').offset().top - $(window).scrollTop();
   		var scrolledY = window.innerHeight - yStart - (window.innerHeight/100)*35;
		$('.ocean-break img').css('left', ((scrolledY)/7)+'vw');
   	}

   	var clicksOnPirate = 0;
   	var start = 0;
   	$('.ocean-break img').on('click', function() {
   		clicksOnPirate++;
   		if (clicksOnPirate == 2) {
   			var scaleVal, x, y;
   			scaleVal = x = y = 0;
   			$(this).animate({borderSpacing: -720*2}, {
			    step: function(now,fx) {
					$(this).css('-webkit-transform','rotate('+now+'deg)');
					$(this).css('-moz-transform','rotate('+now+'deg)');
					$(this).css('transform','rotate('+now+'deg)');
			    },
			    queue: false,
			    duration: 1000
			}, 'linear');
			clicksOnPirate = 0;
   		}
   	});

   	//Both "the day" text at same place
   	var text1y = $('.the-day-text:eq(0)').position().top;
   	$('.the-day-text:eq(1)').css('top', text1y);

	//change between hack and open track
  	$('.the-day .ghost-btn').click(function() {
		if($(this).hasClass('active')) {
			return;
		}
		else {
			// $('.the-day').toggleClass('background-change');
			$('.the-day>img').toggleClass('img-shown').toggleClass('img-not-shown');
			$('.the-day-text').toggleClass('text-shown').toggleClass('text-not-shown');
			$('.the-day .ghost-btn').each(function () {
				$(this).toggleClass('active');
			});
		}
	});

	$('.location-image-holder').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});


	//fix span arrow and float in crew
	var peoples = $('.people');
	fixFloat(peoples);
	$('.people span').each(function() {
		setSpanArrow($(this));
	});
	$(window).on('resize', function() {
		fixFloat(peoples);
		$('.people span').each(function() {
			setSpanArrow($(this));
		});
	});

	//ON RESIZE
	$(window).resize(function() {
		//Make sure "the day" texts end up on same place
		var text1y = $('.the-day-text:eq(0)').position().top;
		$('.the-day-text:eq(1)').css('top', text1y);
	});

});

$(function () {
  var secondsToHack = countdown(1429524000000, function(ts) {
      $("#countdown").text(ts.seconds);
    },
    countdown.SECONDS);
});
