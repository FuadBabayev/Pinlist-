(function ($) {
	"use strict";

	// $("#loading").fadeOut("slow");

	// ______________ LOADER
	$(window).on("load", function (e) {
		$("#global-loader").fadeOut("slow");
	})

	// ______________Cover Image
	$(".cover-image").each(function () {
		var attr = $(this).attr('data-bs-image-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background', 'url(' + attr + ') center center');
		}
	});

	// ______________Active Class
	$(document).ready(function () {
		$(".horizontalMenu-list li a").each(function () {
			var pageUrl = window.location.href.split(/[?#]/)[0];
			if (this.href == pageUrl) {
				$(this).addClass("active");
				$(this).parent().addClass("active"); // add active to li of the current link
				$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
				$(this).parent().parent().prev().click(); // click the item to make it drop
			}
		});
	});


	// ______________ Back to Top
	$(window).on("scroll", function (e) {
		if ($(this).scrollTop() > 0) {
			$('#back-to-top').fadeIn('slow');
		} else {
			$('#back-to-top').fadeOut('slow');
		}
	});
	$("#back-to-top").on("click", function (e) {
		$("html, body").animate({
			scrollTop: 0
		}, 0);
		return false;
	});


	// ______________Quantity-right-plus
	var quantitiy = 0;
	$('.quantity-right-plus').on('click', function (e) {
		e.preventDefault();
		var quantity = parseInt($('#quantity').val());
		$('#quantity').val(quantity + 1);
	});
	$('.quantity-left-minus').on('click', function (e) {
		e.preventDefault();
		var quantity = parseInt($('#quantity').val());
		if (quantity > 0) {
			$('#quantity').val(quantity - 1);
		}
	});

	// ______________Chart-circle
	if ($('.chart-circle').length) {
		$('.chart-circle').each(function () {
			let $this = $(this);
			$this.circleProgress({
				fill: {
					color: $this.attr('data-color')
				},
				size: $this.height(),
				startAngle: -Math.PI / 4 * 2,
				emptyFill: '#f9faff',
				lineCap: ''
			});
		});
	}
	const DIV_CARD = 'div.card';


	// ___________TOOLTIP
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})

	// __________POPOVER
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl)
	})
	// By default, Bootstrap doesn't auto close popover after appearing in the page
	$(document).on('click', function (e) {
		$('[data-bs-toggle="popover"],[data-original-title]').each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				(($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false  // fix for BS 3.3.6
			}

		});
	});

	// ______________Card Remove
	$('[data-bs-toggle="card-remove"]').on('click', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.remove();
		e.preventDefault();
		return false;
	});

	// ______________Card Collapse
	$('[data-bs-toggle="card-collapse"]').on('click', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-collapsed');
		e.preventDefault();
		return false;
	});

	// ______________Card Full Screen
	$('[data-bs-toggle="card-fullscreen"]').on('click', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-fullscreen').removeClass('card-collapsed');
		e.preventDefault();
		return false;
	});

})(jQuery);


// ______________ Modal
$(document).ready(function () {
	$("#myModal").modal('show');
});

//____________For Iphone
if (navigator.userAgent.match(/like Mac OS X/i)) {
	let header = document.querySelector('.header-main');
	header.classList.add('header-absolute');
	window.addEventListener('scroll', function () {
		if (window.pageYOffset > header.offsetY + 60) {
			header.classList.add("header-stick");
		} else {
			header.classList.remove("header-stick");
		}
	})

}

// Dropdown
$(document).ready(function () {
	$(".country").click(function () {
		$(".dropdown-menyu").toggle();
	});
});

// Dropdown Catalog
$(document).ready(function () {
	$(".navbar-catalog").click(function () {
		$(".dropdown-catalog").toggle();
		$('.categories_context').removeClass('active');
	});
});

let $navbar_catalog = $('.navbar-catalog');
let $dropdown_catalog = $('.sptb.bg-white.dropdown-catalog');
$(document).on('click', function (e) {
	if (!$dropdown_catalog.is(e.target) && !$dropdown_catalog.has(e.target).length && !$navbar_catalog.is(e.target) && !$navbar_catalog.has(e.target).length) {
		$dropdown_catalog.hide();
	}
});


let $bid_input = $(".desktop-form .bid-auction-input");
let $bid_auction_minus = $(".desktop-form .bid-auction-minus");
let $bid_auction_plus = $(".desktop-form .bid-auction-plus");
let $bid_context = $(".desktop-form .bid-context .bid-context-value2");
let $bid_context_placed = $(".desktop-form .bid-wheel-context-placed .bid-context-value");
let $bid_apply = $(".desktop-form .bid-auction-apply");


if ($bid_apply.length) {
	$bid_apply.on("click", function () {
		if ($bid_input.val().trim()) {

			$bid_context.text(parseInt($bid_context.text()) + parseInt($bid_input.val()));
			$bid_context_placed.text(Number($bid_input.val()));
		}
	});
	$bid_auction_minus.on('click', function () {
		if (Number($bid_input.val()) >= 100) $bid_input.val(Number($bid_input.val()) - 100);
		else $bid_input.val(0);
	});
	$bid_auction_plus.on('click', function () {
		$bid_input.val(Number($bid_input.val()) + 100);
	});
	let time = 3;
	let a;
	let b;
	let t;
	let alarm = function () {
		$('.bid-wheel .bid-wheel-context-placed').css("display", "flex");
		setTimeout(() => {
			$('.bid-wheel .bid-wheel-context-placed').css("display", "none");
		}, 1000);

		a = 800;
		b = a;
		if(!t){
			t = setInterval(() => {
				let s = $(".svg-desktop circle:last-of-type");
				s.css("strokeDashoffset", - (570 * a) / b);
				a--;
				if (a < 0) {
					clearInterval(t);
					t = null;
				}
			});
		}
	}
	$(".bid-auction-apply").on('click', alarm);
}






















let $bid_input2 = $(".mobile-form  .bid-auction-input");
let $bid_auction_minus2 = $(".mobile-form  .bid-auction-minus");
let $bid_auction_plus2 = $(".mobile-form  .bid-auction-plus");
let $bid_context2 = $(".mobile-form  .bid-context .bid-context-value2");
let $bid_context_placed2 = $(".mobile-form .bid-wheel-context-placed .bid-context-value");
let $bid_apply2 = $(".mobile-form  .bid-auction-apply");


if ($bid_apply2.length) {
	$bid_apply2.on("click", function () {
		if ($bid_input2.val().trim()) {

			$bid_context2.text(parseInt($bid_context2.text()) + parseInt($bid_input2.val()));
			$bid_context_placed2.text(Number($bid_input2.val()));
		}


	});
	$bid_auction_minus2.on('click', function () {

		if (Number($bid_input2.val()) >= 100) $bid_input2.val(Number($bid_input2.val()) - 100);
		else $bid_input2.val(0);
	});
	$bid_auction_plus2.on('click', function () {
		$bid_input2.val(Number($bid_input2.val()) + 100);
	});
	let time = 3;
	let a;
	let b;
	let t;
	let alarm = function () {
		$('.bid-wheel .bid-wheel-context-placed').css("display", "flex");
		setTimeout(() => {
			$('.bid-wheel .bid-wheel-context-placed').css("display", "none");
		}, 1000);

		a = 800;
		b = a;
if(!t){
	t = setInterval(() => {
		let s = $(".mobile-form .mobilesvg circle:last-of-type");
		s.css("strokeDashoffset", - (570 * a) / b);
		a--;
		if (a < 0) {
			clearInterval(t);
			t = null;
		}
	});
}
	}
	$(".bid-auction-apply").on('click', alarm);
}


///---------------------------------
$(document).ready(function () {
	$(".card.description .arrow-down").click(function () {
		let body = $(".card.description .card-body")[0];
		let footer = $(".card.description .card-footer")[0];
		body.classList.toggle("active");
		footer.classList.toggle("active");
		if (body.classList.contains('active')) {
			$(".card.description .arrow-down i")[0].classList = "fa-solid fa-chevron-down";
		} else {
			$(".card.description .arrow-down i")[0].classList = "fa-solid fa-chevron-up";
		}
	});
});

$(document).ready(function () {
	$(".card.mobile-auction .arrow-down").click(function () {
		let body = $(".card.mobile-auction .card-body.item-user2")[0];
		let footer = $(".card.mobile-auction .card-body.item-user.mobile-form")[0];
		body.classList.toggle("active");
		footer.classList.toggle("active");
		if (body.classList.contains('active')) {
			$(".card.mobile-auction .arrow-down i")[0].classList = "fa-solid fa-chevron-down";
		} else {
			$(".card.mobile-auction .arrow-down i")[0].classList = "fa-solid fa-chevron-up";
		}
	});
});

$(document).ready(function () {
	$(".card.comments.mobile-version .arrow-down").click(function () {
		let body = $(".card.comments.mobile-version .card-body")[0];
		let footer = $(".card.comments.mobile-version .card-body.p-0")[0];
		body.classList.toggle("active");
		footer.classList.toggle("active");
		if (body.classList.contains('active')) {
			$(".card.comments.mobile-version .arrow-down i")[0].classList = "fa-solid fa-chevron-down";
		} else {
			$(".card.comments.mobile-version .arrow-down i")[0].classList = "fa-solid fa-chevron-up";
		}
	});
});


let categories = document.querySelectorAll('.categories_catalog_items');
let categories_context = document.querySelectorAll('.categories_context');
for (let i = 0; i < categories.length; i++) {
	categories[i].addEventListener('click', function () {
		for (let j = 0; j < categories_context.length; j++) {
			if (i == j) {
				if (!categories_context[j].classList.contains('active')) {
					categories_context[j].classList.add('active');
				} else {
					categories_context[j].classList.remove('active');
				}
			} else {
				categories_context[j].classList.remove('active');
			}
		}
	});
}



let catalog = document.querySelector('.mobil-kataloq .kataloq-open');
let catalog_close = document.querySelector('.kataloq-open-item .kataloq-header span');
let catalog_sidebar = document.querySelector('.kataloq-open-item');
let inner_catalog = document.querySelectorAll('.kataloq-body .kataloq-body-item');
let inner_catalog_close = document.querySelectorAll('.kataloq-inner-header span');
let inner_catalog_sidebar = document.querySelectorAll('.kataloq-inner-item');


catalog.addEventListener('click', function () {
	if (!catalog_sidebar.classList.contains('active')) {
		catalog_sidebar.classList.add('active');
	}
	else {
		catalog_sidebar.classList.remove('active');
	}
	Array.from(inner_catalog_sidebar).forEach(classlist => {
		if (!catalog_sidebar.classList.contains('active') && classlist.classList.contains('active')) {
			classlist.classList.remove('active');
		}
	});
});
catalog_close.addEventListener('click', function () {
	catalog_sidebar.classList.remove('active');
});
if (document.querySelector('.side-navbar').classList.contains('move-right')) {
	catalog_sidebar.classList.remove('active');
}
for (let i = 0; i < inner_catalog.length; i++) {
	inner_catalog[i].addEventListener('click', function () {

		for (let j = 0; j < inner_catalog_sidebar.length; j++) {
			if (i == j) {
				inner_catalog_sidebar[j].classList.add('active');
				inner_catalog_sidebar[j].children[0].children[0].addEventListener('click', function () {
					inner_catalog_sidebar[j].classList.remove('active');
				});
			} else {
				inner_catalog_sidebar[j].classList.remove('active');
			}
		}
	})
}