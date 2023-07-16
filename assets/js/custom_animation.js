$.fn.isVisible = function () {
	var rect = this[0].getBoundingClientRect();
	return (
		(rect.height > 0 || rect.width > 0) &&
		rect.bottom >= 0 &&
		rect.right >= 0 &&
		rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.left <= (window.innerWidth || document.documentElement.clientWidth)
	);
};
$(document).ready(function  () {
	$('div.wpb_animate_up>*').each(function () {
		$(this).addClass('ae-' + ($(this).index() + 1) + ' flipUp');
	});
 
    $('div.wpb_flip_down>*').each(function () {
		$(this).addClass('ae-' + ($(this).index() + 1) + ' flipdown');
	});
    $('div.wpb_animate_leftright>*').each(function () {
		$(this).addClass('ae-' + ($(this).index() + 1) + ' leftright');
	});
    $('div.wpb_animate_rightleft>*').each(function () {
		$(this).addClass('ae-' + ($(this).index() + 1) + ' rightleft');
	});
});

$(window).on('load scroll', function () {
	var allMods = $('div.wpb_animate_up>*');
	allMods.each(function () {
		var $this = $(this);
		if ($this.isVisible()) {
			$(this).addClass('imIn');
		}
	});
});

$(window).on('load scroll', function () {
	var allMods = $('div.wpb_flip_down>*');
	allMods.each(function () {
		var $this = $(this);
		if ($this.isVisible()) {
			$(this).addClass('imIns');
		}
	});
});
$(window).on('load scroll', function () {
	var allMods = $('div.wpb_animate_leftright>*');
	allMods.each(function () {
		var $this = $(this);
		if ($this.isVisible()) {
			$(this).addClass('imIn');
		}
	});
});
$(window).on('load scroll', function () {
	var allMods = $('div.wpb_animate_rightleft>*');
	allMods.each(function () {
		var $this = $(this);
		if ($this.isVisible()) {
			$(this).addClass('imIn');
		}
	});
});