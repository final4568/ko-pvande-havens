(function ($) {
	var adminbar = 0;
	if ($('#wpadminbar').length) {
		adminbar = $('#wpadminbar').height();
	}

	function generate_select(selector) {
		$(selector).each(function () {
			var $this = $(this),
				activeValue = $this.val(),
				classselect = $this.attr("class"),
				numberOfOptions = $(this).children("option").length;
			$this.addClass("s-hidden");
			$this.wrap('<div class="select ' + classselect + '"></div>');
			$this.after('<div class="styledSelect"></div>');
			var $styledSelect = $this.next("div.styledSelect");
			var getHTML = $this.children('option[value="' + $this.val() + '"]').text();
			$styledSelect.html('<span class="text-ellipses">' + getHTML + '</span>');
			var $list = $("<ul />", { class: "options" }).insertAfter($styledSelect);
			for (var i = 1; i < numberOfOptions; i++) {
				var Cls = $this.children("option").eq(i).attr('class');
				if (Cls == undefined) {
					Cls = '';
				}
				if ($this.children("option").eq(i).val() == activeValue) {
					Cls = Cls + ' active';
					$('.text-ellipses').addClass('valueAdded');
				}
				$("<li />", {
					text: $this
						.children("option")
						.eq(i)
						.text(),
					rel: $this
						.children("option")
						.eq(i)
						.val(),
					class: Cls
				}).appendTo($list);
			}
			var $listItems = $list.children("li");
			$styledSelect.click(function (e) {
				e.stopPropagation();
				if (!$(this).hasClass('active')) {
					$('div.styledSelect.active').each(function () {
						$(this).removeClass('active').next('ul.options').slideUp();
					});
					$(this).toggleClass("active");
					$(this).next("ul.options").stop(true).slideToggle();
				} else {
					$('div.styledSelect.active').each(function () {
						$(this).removeClass('active').next('ul.options').slideUp();
					});
				}
			});
			$listItems.click(function (e) {
				e.stopPropagation();
				$styledSelect.html('<span class="text-ellipses valueAdded">' + $(this).text() + '</span>').removeClass("active");
				var value = $(this).attr("rel").toString();
				$($this).val(value);
				$($this).trigger("change");
				$('ul.options').slideUp();
				$(this).addClass("active").siblings().removeClass("active");
			});
			$(document).click(function () {
				$styledSelect.removeClass("active");
				$list.slideUp();
			});

		});
	}
	//add span to the last word in button
	$('.text-link .elementor-button, .text-link.more-btn, .arrow-btn .elementor-button').html(function(){	
		var text= $(this).text().split(' ');
		var last = (text.pop()).trim();
		return text.join(" ") + ' <span class="last">'+last+'</span>';   
	});


	$(document).ready(function () {
		if (document.documentMode || /Edge/.test(navigator.userAgent)) {
			$('body').addClass('ie_edge');
		}
		generate_select('select:not(.gfield_select)');
		document.activeElement.blur();
		$(document).on('gform_post_render', function (event, form_id, current_page) {
			generate_select('#gform_wrapper_' + form_id + ' select.gfield_select');
			$("li.gf_readonly input").attr("readonly", "readonly");
		});
		//smoothscroll
		$('a[href^= "#"]:not(.main-menu-nav .menu li a, .tabs-nav .elementor-icon-list-item a, .tabs-navigation .elementor-icon-list-item a  ):not(a[href="#"])').on('click', function (x) {
			x.stopImmediatePropagation();
			x.preventDefault();
			$(document).off("scroll");
			var id = $(this).attr('href');
			var $id = $(id);
			if ($id.length === 0) {
				return;
			}
			x.preventDefault();
			var pos = $id.offset().top - adminbar;
			$('body, html').animate({ scrollTop: pos });
		});
	});

	$(document).ready(function() {
		//   $('.main-menu ul.menu > li').addClass('activemenu');
		// $('.burger-btn').on('click', function() {
		//   $('.herader-mobile-wrapper').slideToggle();
		//   $('body').toggleClass('overflowbody mobile-menu-open');
		// });

		// var target = $('.main-menu ul.menu > li');
		// $('.main-menu ul.menu > li').addClass('main-menu-item');
		// target.each(function(){
		// 	if($(this).has('.sub-menu').length > 0){
		// 		var $newdiv1 = $( "<div class='menu-arrow'></div>" );
		// 		$(this).prepend($newdiv1)
		// 	}
		// })
		
		// $('.menu-arrow').on('click', function() {
      	// 	$(this).siblings(".sub-menu").slideToggle().closest('.main-menu-item').toggleClass('is-active').siblings().removeClass("is-active").find(".sub-menu").slideUp()
		//  	$('body').toggleClass('open-submenu');
		// });  
		  
	});


	// $(window).on("load", function() {
	// 	var mainWrapperss = document.querySelectorAll(".single-latest-post .elementor-post");
	// 	mainWrapperss.forEach(function(mainWrappers) {
	// 		var newLink = mainWrappers.querySelector(".elementor-post__thumbnail__link");
	// 		if (!newLink) {
	// 			var newDiv = document.createElement("div");
	// 			newDiv.classList.add("thumbnail_div");
	// 			mainWrappers.prepend(newDiv);
	// 	}
	// 	});
	// });

	// $(window).on("scroll load", function() {
	// 	if($(window).scrollTop() > 0) {
	// 		$("body").addClass("active-header");
	// 	} else {
	// 	   $("body").removeClass("active-header");
	// 	}
	// });
	
	// $(".elementor-accordion-item").on("click", function(x){
	// 	if (window.matchMedia("(max-width: 900px)").matches) {
	// 		const item = $(this);
	// 		setTimeout(function () { 
	// 		const position = item.offset().top;
	// 		$("body, html").animate({ scrollTop: position - adminbar - $("[data-elementor-type='header']").height() - 10});
	// 	 }, 500);
	// 	} 
	// });

	
	// $(document).on('facetwp-refresh', function() {
	// 	if (FWP.soft_refresh == true) {
	// 		FWP.enable_scroll = true;
	// 	} else {
	// 		FWP.enable_scroll = false;
	// 	}
	// });
	
    // $(document).on('facetwp-loaded', function() {
	// 	if (FWP.enable_scroll == true) {
	// 		var topbar = 0;
	// 		if($('html #wpadminbar').length>0){
	// 			topbar = $('html #wpadminbar').height();
	// 		}
	// 		$('html,body').animate({
	// 			scrollTop: $('.facetwp-scroll-top').offset().top - $('.elementor-location-header').height() - topbar
	// 		});
	// 	}
	// });




	

}(jQuery))
