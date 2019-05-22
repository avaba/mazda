jQuery(document).ready(function($){
	/*$(document).click( function(event){
		if( $(event.target).closest(".head__city_list").length ) 
			return;
		$(".head__city_list").fadeOut(0);
		event.stopPropagation();
	});
	$('.head__city_name').click( function() {
		$(this).siblings(".head__city_list").toggle();
		return false;
	});

	$('.big-banner').slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.sing-carusel').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		]
	});*/

	$('.commentSlide__block').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		]
	});

	var wow = new WOW(
	{
		boxClass:     'wow', 
		animateClass: 'animated',
		offset:       200,         
		mobile:       false
	}
	);
	wow.init();

	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		adaptiveHeight: true,
		asNavFor: '.slider-nav'
	});
	$('.slider-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		focusOnSelect: true,
		responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: true,
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
			}
		}
		]
	});

	$(".tarifTable__link").click(function() {
		$(".tarifTable__table").slideToggle();
	});

});


jQuery(document).ready(function($){
	var action = 'click';
	var speed = "500";
	$(document).ready(function(){
		$('li.q').on(action, function(){
			$(this).next().slideToggle(speed)
			.siblings('li.a').slideUp();

			var img = $(this).children('i');
			$('i').not(img).removeClass('rotate');
			img.toggleClass('rotate');

		});
	});
});