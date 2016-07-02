(function($, viewport) {
    $(document).ready(function() {

        // accordion for bag on front page
        $('#accordion .collapse').collapse({
            toggle: false,
            parent: '#accordion'
        });
        // always open tab in accordion after clicking on icon
        $(".poi").click(function() {
            var myClass = $(this).attr("class");
            myClass = myClass.replace('poi ', '');
            $("#accordion #poi-text-" + myClass).collapse("show");
        });
        $('#accordion').on('hide.bs.collapse', function() {
            var id = $('#accordion .in').attr("id");
            $("a.poi").removeClass("active");
        })
        $('#accordion').on('shown.bs.collapse', function() {
            var myId = $('#accordion .in').attr("id");
            var myClass = myId.replace('poi-text-', '');
            $("a." + myClass).addClass("active");
        })


        // toggle additional fields in cart section
        $("#cart-toggle-company-cb").click(function() {
            $("#cart-toggle-company").slideToggle();
        });
        $("#cart-toggle-another-address-cb").click(function() {
            $("#cart-toggle-another-address").slideToggle();
        });

        // add class to nav when scrolled
        $(window).scroll(function() {
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
            viewport.changed(function() {
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

        // smooth scroll ;)
        smoothScroll.init({
            offset: 60, // Integer. How far to offset the scrolling anchor location in pixels
            updateURL: false
        });

    });
})(jQuery, ResponsiveBootstrapToolkit);


$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});


function funcReadMore() {
    $('.readmore').readmore({
        moreLink: '<a href="#">zobrazit více</a>',
        lessLink: '<a href="#">skrýt</a>'
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
