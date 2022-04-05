(function ($) {
	"use strict";

	$(".msg-trigger-btn").on("click", function (event) {
		event.stopPropagation();
		event.preventDefault();
		var $this = $(this);
		var $prevTartget = $(this).parent().siblings().children(".msg-trigger-btn").attr('href');
		var target = $this.attr('href');
		$(target).slideToggle();
		$($prevTartget).slideUp();
		
    });

	//Cerrar al hacer clic fuera
	$('body').on('click', function(e){
		var $target = e.target;
		if (!$($target).is('.message-dropdown') && !$($target).parents().is('.message-dropdown')) {
			$(".message-dropdown").slideUp("slow");
		}
	});

	//Imagen de fondo Inicio JS
	var bgSelector = $(".bg-img");
	bgSelector.each(function (index, elem) {
		var element = $(elem),
			bgSource = element.data('bg');
		element.css('background-image', 'url(' + bgSource + ')');
	});

    // Reproductor de video activa js
	var plyrVideo = new Plyr('.plyr-video'),
      	plyrAudio = new Plyr('.plyr-audio'),
      	plyrYoutube = new Plyr('.plyr-youtube'),
		plyrVimeo = new Plyr('.plyr-vimeo');
		  
    // carrusel de perfil activo js
	$('.active-profile-carousel').slick({
        speed: 800,
        slidesToShow: 10,
		prevArrow: '<button type="button" class="slick-prev"><i class="bi bi-arrow-left-rounded"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="bi bi-arrow-right-rounded"></i></button>',
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 8,
			}
		}]
	});

	// carrusel de perfil activo js
	$('.active-profile-mobile').slick({
        speed: 800,
		slidesToShow: 6,
		arrows: false,
		responsive: [{
			breakpoint: 480,
			settings: {
				slidesToShow: 4,
			}
		}]
	});

	// carrusel de perfil activo js
	$('.favorite-item-carousel').slick({
		autoplay: true,
        speed: 800,
		slidesToShow: 5,
		arrows: false,
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 2,
			}
		}]
	});

	// cuadro de chat en vivo y cuadro de búsqueda de amigos active js
	$(".profile-active").on('click', function(){
		$(".chat-output-box").addClass('show');
	})
	$(".search-field").on('click', function(){
		$(".friend-search-list").addClass('show');
	})
	$(".close-btn").on('click', function(){
		var $this = $(this),
			$target = $this.data('close');
		$('.'+$target).removeClass('show');
	})
	
	// cuadro de búsqueda de encabezado móvil activo
	$(".search-trigger").on('click', function(){
		$('.search-trigger, .mob-search-box').toggleClass('show');
	})
	
	$(".chat-trigger, .close-btn").on('click', function(){
		$('.mobile-chat-box').toggleClass('show');
	})
	$(".request-trigger").on('click', function(){
		$('.frnd-request-list').toggleClass('show');
	})

	// Búsqueda de amiga móvil activa js
	$(".search-toggle-btn").on('click', function(){
		$('.mob-frnd-search-inner').toggleClass('show');
	})

	// Desencadenador desplegable de perfil js
	$('.profile-triger').on('click', function(event){
		event.stopPropagation();
        $(".profile-dropdown").slideToggle();
	})

	//Cerrar al hacer clic fuera
	$('body').on('click', function(e){
		var $target = e.target;
		if (!$($target).is('.profile-dropdown') && !$($target).parents().is('.profile-dropdown')) {
			$(".profile-dropdown").slideUp("slow");
		}
	});

	// barra de desplazamiento perfecta js
	$('.custom-scroll').each(function(){
		var ps = new PerfectScrollbar($(this)[0]);
	});


	// galería de luz activa js
	$(document).ready(function() {
        $(".img-popup").lightGallery(); 

		// galería de luz activa js
        $(".img-gallery").lightGallery({
			selector: ".gallery-selector",
			hash: false
		}); 
	});

	$('.gallery-toggle').on('click', function () {

	var productThumb = $(this).find(".product-thumb-large-view img"),
			imageSrcLength = productThumb.length,
			images = [];
		for (var i = 0; i < imageSrcLength; i++) {
			images[i] = {"src": productThumb[i].src, "thumb": productThumb[i].src};
		}

		$(this).lightGallery({
			dynamic: true,
			actualSize: false,
			hash: false,
			index: 0,
			dynamicEl: images
		});

	});

	// filtro de fotos activo js
	$('.photo-filter').imagesLoaded( function() {
		var $grid = $('.photo-filter, .friends-list').isotope({
		});
		// filtrar elementos al hacer clic en el botón
		$('.filter-menu').on( 'click', 'button', function() {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
			$(this).siblings('.active').removeClass('active');
	         $(this).addClass('active');
		});
		
	});

	// agradable seleccione activo js
	$('select').niceSelect();

	// Desplácese hasta la parte superior activa js
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 600) {
			$('.scroll-top').removeClass('not-visible');
		} else {
			$('.scroll-top').addClass('not-visible');
		}
	});
	$('.scroll-top').on('click', function (event) {
		$('html,body').animate({
			scrollTop: 0
		}, 1000);
	});


	$('#email').bind("cut copy paste",function(e) {
		e.preventDefault();
	});
    

	// ===================================================================================

	







})(jQuery);

