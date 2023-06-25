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
		$('a[href^= "#"]:not(.main-menu-nav .menu li a, .galler-tab-nav .elementor-icon-list-item a, .galler-tab-navigation .elementor-icon-list-item a  ):not(a[href="#"])').on('click', function (x) {
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
	/*Mobile Header*/
	$('.menu-open-btn').on('click', function () {
		$('.mobile-header-wrapper').slideToggle();
		$('body').toggleClass('overflowbody mobile-menu-open');
		// $('.header-wrapper .header-menu-wrapper .header-menu-colum').addClass('activemenu');
	});
	var $opensubmenu = $("<div class='open-submenu-arrow'></div>");
		$('.mobile-menu ul.menu > li.menu-item-has-children').prepend($opensubmenu);

		var $openchild_submenu = $("<div class='open-chilssubmenu-arrow'></div>");
		$('.mobile-menu ul.menu > li > .sub-menu > li.menu-item-has-children').prepend($openchild_submenu);



		$('.open-submenu-arrow').on('click', function () {
			$(this).siblings(".sub-menu").slideToggle().closest('li.menu-item-has-children').toggleClass('is-active').siblings().removeClass("is-active").find(".sub-menu").slideUp();
			$('.mobile-menu ul.menu > li > .sub-menu > li.menu-item-has-children').removeClass('is-active')
		});

		$('.open-chilssubmenu-arrow').on('click', function () {
			$(this).siblings(".sub-menu").slideToggle().closest('.mobile-menu ul.menu > li > .sub-menu > li.menu-item-has-children').toggleClass('is-active').siblings().removeClass("is-active").find(".sub-menu").slideUp()
		});

		$(".galler-tab-nav .elementor-icon-list-item").first().addClass("active");
		$(".tabs-sect:not(.elementor-element-edit-mode)").hide();
		$(".tabs-sect").first().show();

		$(".galler-tab-nav .elementor-icon-list-item ").click(function (e) {
			e.preventDefault();
			$(".galler-tab-nav .elementor-icon-list-item").removeClass("active");
			$(this).addClass("active");
			$(".tabs-sect:not(.elementor-element-edit-mode)").hide();
			var activeTab = $(this).find("a").attr("href");
			$(activeTab).fadeIn();
			return false;
		});
		  
	});
	$(window).on("scroll load", function () {
		if ($(window).scrollTop() > 50) {
			$("body").addClass("active-header");
		} else {
			$("body").removeClass("active-header");
		}

		/**/
		var checknot_found_class = $('.post-single-left');
		if (checknot_found_class.hasClass('job-not-found')) {
		$('.job-posting-main-erapper').addClass('job-post-empty-content');
		}
	});

	var swiper = new Swiper(".hs-slider", {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		autoplay: {
			delay: 2000,
		  },
		pagination: {
			el: ".hs-main-wrpper  .swiper-pagination",
			clickable: true,
		},
	
		navigation: {
			nextEl: ".hs-arrow-controll-next",
			prevEl: ".hs-arrow-controll-prev",
		},
	});
	
	var swiper = new Swiper(".fav-Food-swiper", {
		slidesPerView: 1,
		grabCursor: true,
		spaceBetween: 20,
		loop: true,
		// autoplay: {
		// 	delay: 2000,
		// },
		pagination: {
		  el: ".fav-Food-swiper .swiper-pagination",
		  clickable: true,
		},
		breakpoints: {
			700: {
			  slidesPerView: 2,
			  spaceBetween: 20,
			},
			1024: {
			  slidesPerView: 3,
			  spaceBetween: 30,
			},
		  },
	  });
	  function kovp_pagination() {

		// target container
		let container = '.facetwp-pager';

		// exist if facetwp not on the page
		if (!$(container).length) {
			return;
		}

		// range limit for mobile
		let mb_limit = 0;

		// end point range limit for mobile
		let mb_endpoints_limit = 1;

		// range limit for desktop
		let dk_limit = 1;

		// end point range limit for desktop
		let dk_endpoints_limit = 2;

		let mb_hide_class = 'kovp-hide-page-mb';
		let dk_hide_class = 'kovp-hide-page-dk';

		// dots markup
		let dots_start = '<a class="facetwp-page dots start ' + mb_hide_class + ' ' + dk_hide_class + '">…</a>';
		let dots_end = '<a class="facetwp-page dots end ' + mb_hide_class + ' ' + dk_hide_class + '">…</a>';

		// ----------------------------------------------------

		let total_pages = parseInt($(container + ' a.facetwp-page.last').attr('data-page'));
		let active_page = parseInt($(container + ' a.facetwp-page.active').attr('data-page'));

		// check if the current page is an endpoint
		let is_endpoint_page = (active_page === 1 || active_page === total_pages) ? true : false;

		let mb_range_start = is_endpoint_page ? active_page - mb_endpoints_limit : active_page - mb_limit;
		let mb_range_end = is_endpoint_page ? active_page + mb_endpoints_limit : active_page + mb_limit;

		let dk_range_start = is_endpoint_page ? active_page - dk_endpoints_limit : active_page - dk_limit;
		let dk_range_end = is_endpoint_page ? active_page + dk_endpoints_limit : active_page + dk_limit;

		let dots_mb_start, dots_mb_end, dots_dk_start, dots_dk_end = false;

		// ----------------------------------------------------

		$(container + ' .dots').remove();

		$(container + ' a.facetwp-page:not(.prev, .next)').removeClass(mb_hide_class + ' ' + dk_hide_class);

		// loop over all the page numbers, excluding 'previous' and 'next' elements
		$(container + ' a.facetwp-page:not(.active, .prev, .next, [data-page="1"], [data-page="' + total_pages + '"])').each(function (i, obj) {

			let current_page = $(this).attr('data-page');

			if (current_page < mb_range_start) {
				$(this).addClass(mb_hide_class);
				dots_mb_start = true;
			}

			if (current_page > mb_range_end) {
				$(this).addClass(mb_hide_class);
				dots_mb_end = true;
			}

			if (current_page < dk_range_start) {
				$(this).addClass(dk_hide_class);
				dots_dk_start = true;
			}

			if (current_page > dk_range_end) {
				$(this).addClass(dk_hide_class);
				dots_dk_end = true;
			}

		});

		// add dots element - start
		if (dots_mb_start || dots_dk_start) {

			$(container + ' a.facetwp-page[data-page="1"]').after(dots_start);

			if (dots_mb_start) {
				$(container + ' .dots.start').removeClass(mb_hide_class);
			}

			if (dots_dk_start) {
				$(container + ' .dots.start').removeClass(dk_hide_class);
			}

		}

		// add dots element - end
		if (dots_mb_end || dots_dk_end) {

			$(container + ' a.facetwp-page[data-page="' + total_pages + '"]').before(dots_end);

			if (dots_mb_end) {
				$(container + ' .dots.end').removeClass(mb_hide_class);
			}

			if (dots_dk_end) {
				$(container + ' .dots.end').removeClass(dk_hide_class);
			}

		}

		active_page = active_page ? active_page : 1;
		total_pages = total_pages ? total_pages : 1;

		$('.kovp-total-page-counter span.kovp-current-page').html(active_page);
		$('.kovp-total-page-counter span.kovp-total-page').html(total_pages);

	}

	  $(window).on('load resize', function () {
		kovp_pagination();
	});
	  document.addEventListener('facetwp-loaded', function () {
		if (FWP.loaded) {
			$('.facetwp-facet-post_pagination').show();
			kovp_pagination();
			if ($('.facetwp-scroll-top').length) {
				$('html,body').animate({
					scrollTop: $('.facetwp-scroll-top').offset().top - $('.elementor-location-header').height()
				});
			}
		}
	});
}(jQuery))

