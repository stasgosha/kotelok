// TODO: ↓↓↓ remove this script ↓↓↓
// Current menu item highlithing
$(function () {
	var location = window.location.href;
	var cur_url = location.split('/').pop();

	$('.top-nav li, .mobile-top-nav li, .footer-nav li').each(function () {
		var link = $(this).find('a').attr('href');

		// console.log(link);

		if (cur_url == '') {
			cur_url = 'index.html';
		}

		if (cur_url == link)
		{
			$(this).addClass('current-menu-item');
			$(this).parents('li').addClass('current-menu-parent');
		}
	});
});


document.addEventListener('DOMContentLoaded', function(){

	setTimeout(function(){
		$('.side-line').each(function(i, el){
			let contentWidth = $(el).find('.line-inner').width();

			$(el).find('.line-holder').height(contentWidth);
		});
	}, 300);

	$('.side-line .line-inner').click(function(e){
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $(this).closest('section').next('section').offset().top - $('.header').outerHeight()
		}, 500);
	});


	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}

	// WOW
	if ($(window).width() >= 768) {
		new WOW().init();
	}

	// Schema
	$('.schema-component .arrow').click(function(e){
		e.preventDefault();

		let selectors = $(this).data('toggle');

		$(selectors).addClass('active');
		$(this).addClass('done');
	});

	// Footer
	function setFooterHolder(){
		if ($(window).width() >= 768) {
			$('.page-content').css('margin-bottom', $('.footer').outerHeight());
		} else{
			$('.page-content').css('margin-bottom', 0);
		}
	}

	setFooterHolder();
	$(window).resize(setFooterHolder);
	setTimeout(setFooterHolder, 300);

	// Fields
	$('.input-wrapper input').on('change keyup', function(e){
		if ($(this).val() !== '') {
			$(this).addClass('not-empty');
		} else{
			$(this).removeClass('not-empty');
		}
	});

	// Stages
	let isFirstStageInit = true;
	$('.stage-caption').click(function(e){
		e.preventDefault();

		let duration = isFirstStageInit ? 0 : 1500;

		isFirstStageInit = false;

		$(this).toggleClass('active');
		$(this).siblings('.stage-hidden-content').stop().slideToggle(duration);
		$(this).siblings('.stage-hidden-content').find('.slick-slider').slick('setPosition');
	});

	$('.stage-caption').eq(0).trigger('click');

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Предыдущий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path d="M10 2L8 0 0 8.2l8 8.2 2-2-6.2-6.2L10 2z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Следующий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path d="M0 2l2-2 8 8.2-8 8.2-2-2 6.2-6.2L0 2z"/></svg></button>'
	}

	$('.gallery-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		infinite: true,
		speed: 600,
		...arrowsButtons,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					arrows: false
				}
			}
		]
	});



	// Structure section
	if ($(window).width() >= 576) {
		$('.structure-section').each(function(i, el){
			$(el).find('.legend [data-number]').hover(function(){
				let number = $(this).data('number');

				$(el).find('.tooltips [data-number='+number+']').addClass('active').siblings().removeClass('active');
			}, function(){
				$(el).find('.tooltips [data-number]').removeClass('active');
			});

			$(el).find('.tooltips [data-number]').hover(function(){
				let number = $(this).data('number');

				$(el).find('.legend [data-number='+number+']').addClass('active').siblings().removeClass('active');
			}, function(){
				$(el).find('.legend [data-number]').removeClass('active');
			});
		});
	}

	if ($(window).width() < 576) {
		$('.structure-section').each(function(i, el){
			$(el).find('.tooltips [data-number=1]').addClass('active').siblings().removeClass('active');

			$(el).find('.mobile-legend').on('beforeChange', function(event, slick, currentSlide, nextSlide){
				let currentItem = +$(el).find('[data-slick-index='+nextSlide+'] [data-number]').data('number');

				$(el).find('.tooltips [data-number='+currentItem+']').addClass('active').siblings().removeClass('active');
			});

			$(el).find('.mobile-legend').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: true,
				infinite: true,
				speed: 600,
				...arrowsButtons,
				adaptiveHeight: true
			});

			$(el).find('.tooltips [data-number]').click(function(e){
				e.preventDefault();

				let number = +$(this).data('number');

				$(el).find('.mobile-legend').slick('slickGoTo', number - 1);
			});
		});
	}


	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 80
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$(this).toggleClass('active');
		$('.mobile-top-nav').toggleClass('opened');
		$('.header').toggleClass('nav-opened');
	});

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 0
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	}


	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);

	// Modals
	$('.modal').css('display','block');

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		hideModal( $(this) );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('.modal-close, .js-modal-close').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		hideModal('.modal');

		if ($(this).data('modal-tab') != undefined) {
			goToTab($(this).data('modal-tab'));
		}

		showModal( $(this).data('modal') );
	});

	// Tabs
	function goToTab(tabId, handler){
		if (handler == undefined) {
			handler = false;
		}

		let dest = $( tabId );
		dest.stop().fadeIn(300).siblings().hide(0);

		$('[data-tab="'+tabId+'"]').addClass('current').parent().siblings().find('[data-tab]').removeClass('current');
	}

	$("[data-tab]").click(function(e){
		e.preventDefault();
		let dest = $(this).data('tab');

		goToTab(dest, $(this));

		$(dest).find('.slick-slider').slick('setPosition');
	});

	$(".filter-nav, .tabs-nav, .cmp-tabs-nav").each(function(i, el){
		$(el).find('[data-tab]').eq(0).click();
	});

	$('.tabs-select').on('change', function(){
		goToTab($(this).val());
	});


	// Video
	$('.video-block:not([data-video-modal])').on('click', function () {
		$(this).addClass('playing');
		$(this).find('.block-overlay').fadeOut(300);

		let videoId = $(this).find('.play-btn').data('video-id');

		if (!videoId) {
			videoId = $(this).data('video-id');
		}

		if (videoId == undefined) {
			$(this).find('video')[0].play();
		} else{
			let videoType = $(this).data('video-type') ? $(this).data('video-type').toLowerCase() : 'youtube';

			if (videoType == 'youtube') {
				$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"></div>');
				createVideo(videoId, videoId);
			} else if(videoType == 'vimeo'){
				$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"><iframe allow="autoplay" class="video-iframe" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=0&app_id=122963"></div>');
			}
		}
	});

	$('[data-video-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		let videoId = $(this).data('video-modal');
		let videoType = $(this).data('video-type');

		if (videoType == 'youtube') {
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('youtube').append('<div class="video-iframe" id="'+videoId+'"></div>');
			createVideo(videoId, videoId);
		} else if(videoType == 'vimeo'){
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('vimeo').html('<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=1&app_id=122963">');
		}

		hideModal('.modal');

		showModal( "#video-modal" );
	});

	var player;
	function createVideo(videoBlockId, videoId) {
		player = new YT.Player(videoBlockId, {
			videoId: videoId,
			playerVars: {
				'autohide': 1,
				'showinfo' : 0,
				'rel': 0,
				'loop': 1,
				'playsinline': 1,
				'fs': 0,
				'allowsInlineMediaPlayback': true
			},
			events: {
				'onReady': function (e) {
					// e.target.mute();
					// if ($(window).width() > 991) {
						setTimeout(function(){
							e.target.playVideo();
						}, 200);
					// }
				}
			}
		});
	}
});

function getScrollWidth(){
	// create element with scroll
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;

	div.remove();

	return scrollWidth;
}

let bodyScrolled = 0;
function showModal(modal){
	$(modal).addClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').addClass('modal-visible')
			 .scrollTop(bodyScrolled)
			 .css('padding-right', getScrollWidth());
}

function hideModal(modal){
	$(modal).removeClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').removeClass('modal-visible')
			 .scrollTop(bodyScrolled)
			 .css('padding-right', 0);
}