// 整页滚动
$(function(){
    $('#dowebok').fullpage();
});

// 第一屏3D播放
'use strict';
window.addEventListener('load', function () {
	var carousels = document.querySelectorAll('.carousel');

	for (var i = 0; i < carousels.length; i++) {
		carousel(carousels[i]);
	}
});

function carousel(root) {
	var figure = root.querySelector('figure'),
	    nav = root.querySelector('nav'),
	    images = figure.children,
	    n = images.length,
	    gap = root.dataset.gap || 0,
	    bfc = 'bfc' in root.dataset,
	    theta = 2 * Math.PI / n,
	    currImage = 0;

	setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
	window.addEventListener('resize', function () {
		setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
	});

	setupNavigation();

	function setupCarousel(n, s) {
		var apothem = s / (2 * Math.tan(Math.PI / n));

		figure.style.transformOrigin = '50% 50% ' + -apothem + 'px';

		for (var i = 0; i < n; i++) {
			images[i].style.padding = gap + 'px';
		}for (i = 1; i < n; i++) {
			images[i].style.transformOrigin = '50% 50% ' + -apothem + 'px';
			images[i].style.transform = 'rotateY(' + i * theta + 'rad)';
		}
		if (bfc) for (i = 0; i < n; i++) {
			images[i].style.backfaceVisibility = 'hidden';
		}rotateCarousel(currImage);
	}

	function setupNavigation() {
		nav.addEventListener('click', onClick, true);

		function onClick(e) {
			e.stopPropagation();

			var t = e.target;
			if (t.tagName.toUpperCase() != 'BUTTON') return;

			if (t.classList.contains('next')) {
				currImage++;
			} else {
				currImage--;
			}

			rotateCarousel(currImage);
		}
	}

	function rotateCarousel(imageIndex) {
		figure.style.transform = 'rotateY(' + imageIndex * -theta + 'rad)';
	}
}

//第二屏3D播放
$(function() {
	var Page = (function() {
		var $navArrows = $( '#nav-arrows' ).hide(),
			$shadow = $( '#shadow' ).hide(),
			slicebox = $( '#sb-slider' ).slicebox( {
				onReady : function() {
					$navArrows.show();
					$shadow.show();
				},
				orientation : 'r',
				cuboidsRandom : true,
				disperseFactor : 30
			} ),
			init = function() {
				initEvents();
			},
			initEvents = function() {
				// add navigation events
				$navArrows.children( ':first' ).on( 'click', function() {
					slicebox.next();
					return false;
				} );
				$navArrows.children( ':last' ).on( 'click', function() {
					slicebox.previous();
					return false;
				} );
			};
			return { init : init };
	})();
	Page.init();
});
// 环形小球
$(document).ready(function (ev) {
    var toggle = $('#ss_toggle');
    var menu = $('#ss_menu');
    var rot;
    $('#ss_toggle').on('click', function (ev) {
        rot = parseInt($(this).data('rot')) - 180;
        menu.css('transform', 'rotate(' + rot + 'deg)');
        menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
        if (rot / 180 % 2 == 0) {
            toggle.parent().addClass('ss_active');
            toggle.addClass('close');
        } else {
            toggle.parent().removeClass('ss_active');
            toggle.removeClass('close');
        }
        $(this).data('rot', rot);
    });
    menu.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
        if (rot / 180 % 2 == 0) {
            $('#ss_menu div i').addClass('ss_animate');
        } else {
            $('#ss_menu div i').removeClass('ss_animate');
        }
    });
});
//用于首屏悬浮
$(function(){
	var x_ex = 0,y_ex = 0,postionX = 0,postionY = 0,disPositionX = 0,disPositionY = 0;
	$(".page1").mousemove(function(ev){
        var e = ev || window.event
        if(x_ex < e.pageX){
        	disPositionX = (e.pageX-x_ex);	
        }else{
        	disPositionX = -(x_ex-e.pageX);	
        }
        if(y_ex < e.pageY){
        	disPositionY = (e.pageY-y_ex);
        }else{
        	disPositionY = -(y_ex-e.pageY);
        }
        postionX += disPositionX*0.07;
        postionY += disPositionY*0.05;
        $(".PageBg1").css({marginTop: -postionY,marginLeft:postionX});
        x_ex = e.pageX;
        y_ex = e.pageY;
	});
})