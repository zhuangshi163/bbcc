/**
author : zhupinglei || 344184416@qq.com
desc : lazyload.js
**/
(function($){
	$.fn.lazyload = function(){
		var here = this;
		var winHeight = $(window).height();
		function showImg(){
			$(here).each(function(){
				var imgH = $(this).height(),
					topVal = $(this).get(0).getBoundingClientRect().top;
				if( (topVal < (winHeight-(imgH/3))) && $(this).hasClass('lazy') ){
					$(this).hide().attr('src',$(this).data('original')).fadeIn().removeClass('lazy');	
				}
			})
		}
		showImg();
		$(window).scroll(function(){
			showImg();
		})
	}
})(jQuery);