(function ($, viewport) {
	$(document).ready(function () {

		// accordion for bag on front page
		$('#accordion .collapse').collapse({
			toggle: false,
			parent: '#accordion'
		});
		// always open tab in accordion after clicking on icon
		$(".poi").mouseover(function () {
			var myClass = $(this).attr("class");
			myClass = myClass.replace('poi ', '');
			$("#accordion #poi-text-" + myClass).collapse("show");
		});
		$('#accordion').on('hide.bs.collapse', function () {
			var id = $('#accordion .in').attr("id");
			$("a.poi").removeClass("active");
		})
		$('#accordion').on('shown.bs.collapse', function () {
			var myId = $('#accordion .in').attr("id");
			var myClass = myId.replace('poi-text-', '');
			$("a." + myClass).addClass("active");
		})

		// toggle additional fields in cart section
		// $("#cart-toggle-company-cb").click(function () {
		// 	$("#cart-toggle-company").slideToggle();
		// });
		// $("#cart-toggle-another-address-cb").click(function () {
		// 	$("#cart-toggle-another-address").slideToggle();
		// });

		// new cart design toggles
		$("#cart-toggle-delivery-address-cb").click(function () {
			$("#cart-toggle-delivery-address").slideToggle();
		});
		$("#cart-toggle-person-rb").click(function () {
			$("#cart-toggle-person").slideDown();
			$("#cart-toggle-company").slideUp();
		});
		$("#cart-toggle-company-rb").click(function () {
			$("#cart-toggle-company").slideDown();
			$("#cart-toggle-person").slideUp();
		});

		// add class to nav when scrolled
		$(window).scroll(function () {
			var nav = $('nav.navbar');
			var top = 80;
			if ($(window).scrollTop() >= top) {
				nav.addClass('fixed');
			} else {
				nav.removeClass('fixed');
			}
		});

		// Executes only in SM breakpoint
		if (viewport.is('<=sm')) {
			funcReadMore();
		}
		// Execute code each time window size changes
		$(window).resize(
			viewport.changed(function () {
				if (viewport.is('>sm')) {
					$('.readmore').readmore('destroy');
				}
				if (viewport.is('<=sm')) {
					funcReadMore();
				}
			})
		);

		// reveal things when scrolled
		revealThings();

		// cart dropdown in navigation
		dropDownNav();

		// smooth scroll ;)
		smoothScroll.init({
			offset: 60, // Integer. How far to offset the scrolling anchor location in pixels
			updateURL: false
		});

		// home dots
		homeDots();

		// Tooltips overall
		$("body").tooltip({ selector: '[data-toggle=tooltip]' });

	});
})(jQuery, ResponsiveBootstrapToolkit);

$(document).delegate('*[data-toggle="lightbox"]', 'click', function (event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});

function funcReadMore() {
	$('.readmore').readmore({
		moreLink: '<a href="#">zobrazit více</a>',
		lessLink: '<a href="#">skrýt</a>'
	});
}


function dropDownNav() {
	// $('ul.nav li.dropdown').find('.dropdown-menu').stop(true, true).slideDown(50);
	$('ul.nav li.dropdown').mouseenter(function () {
		$(this).find('.dropdown-menu').stop(true, true).slideDown(50);
	});
	$('ul.nav li.dropdown').mouseleave(function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(100).slideUp(150);
	});
}


function revealThings() {
	var customReveal = {
		delay: 100,
		duration: 1000,
		distance: 0,
		easing: 'ease-in-out',
		// rotate: {
		//	 z: 10
		// },
		// reset: true,
		// scale: 0.94,
		move: 0,
		scale: 0.96,
		useDelay: 'once',
		viewOffset: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		}
	};
	var seqDelay = 100;
	window.sr = ScrollReveal();
	// Add class to <html> if ScrollReveal is supported
	if (sr.isSupported()) {
		document.documentElement.classList.add('sr');
		if ($('.stripe-benefits .benefit').length != 0) {
			sr.reveal('.stripe-benefits .benefit', customReveal, seqDelay);
		}
		sr.reveal('.reveal', customReveal);
		// sr.reveal('a.poi', customReveal, seqDelay);
	}
}

function homeDots() {
	var contentSections = $('.cd-section'),
		navigationItems = $('#cd-vertical-nav a');

	updateNavigation();
	$(window).on('scroll', function () {
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function (event) {
		event.preventDefault();
		smoothScroll($(this.hash));
	});
	//smooth scroll to second section
	$('.cd-scroll-down').on('click', function (event) {
		event.preventDefault();
		smoothScroll($(this.hash));
	});

	//open-close navigation on touch devices
	$('.touch .cd-nav-trigger').on('click', function () {
		$('.touch #cd-vertical-nav').toggleClass('open');

	});
	//close navigation on touch devices when selectin an elemnt from the list
	$('.touch #cd-vertical-nav a').on('click', function () {
		$('.touch #cd-vertical-nav').removeClass('open');
	});

	function updateNavigation() {
		contentSections.each(function () {
			$this = $(this);
			var activeSection = $('#cd-vertical-nav a[href="#' + $this.attr('id') + '"]').data('number') - 1;
			if (($this.offset().top - $(window).height() / 2 < $(window).scrollTop()) && ($this.offset().top + $this.height() - $(window).height() / 2 > $(window).scrollTop())) {
				navigationItems.eq(activeSection).addClass('is-selected');
			} else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
		$('body,html').animate({
				'scrollTop': target.offset().top
			},
			600
		);
	}
}
