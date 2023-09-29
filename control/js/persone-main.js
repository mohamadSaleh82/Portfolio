/*global $, WOW*/
/*
===========================================================================
 EXCLUSIVE ON themeforest.net
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Project Name		: Persone - Responsive CV/Resume Template
 Author             : Yahya Essam
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Copyright (c) 2016 - 2020 Yahya Essam - https://themeforest.net/user/visionscode
===========================================================================
*/

const $window = jQuery(window),
    /* window cash */
    $loading = jQuery('.loading'),
    /* loading cash */
    $body = jQuery("body"),
    /* body cash */
    $header = jQuery('.large-header'),
    /* header cash */
    $nav = jQuery('#nav'),
    /* nav cash */
    $link = jQuery("#nav a"); /* nav a cash */

/* Loading Animations */
$window.on("load", function() {
    'use strict';
    $loading.fadeOut();
    $body.css({
        overflow: "visible"
    });
    $header.css({
        display: "block"
    });
});
'use strict';
var Persone = {
    init: function() {
        this.functionality.init()
    },
    functionality: {
        init: function() {
            const e = this;
            e.scrollEvents(),
                e.smoothScroll(),
                e.navToggle(),
                e.goToTop(),
                e.goToTopToggle(),
                e.pluginsInit(),
                e.ripples(),
                e.jarallax(),
                e.owl()
        },
        scrollEvents: function() {
            const $scrollPos = jQuery(document).scrollTop(),
                $links = jQuery('.nav li a');
            $window.on("scroll", function() {
                /* Toggle Nav */
                if ($window.scrollTop() > 280) {
                    $nav.addClass("scroll");
                } else {
                    $nav.removeClass("scroll");
                }
                /* Toggle Active */
                $links.each(function() {
                    const $currLink = jQuery(this),
                        $refElement = jQuery($currLink.attr("href"));
                    if ($refElement.position().top <= $scrollPos + 100 && $refElement.position().top + $refElement.height() > $scrollPos) {
                        $links.removeClass("active").blur();
                        $currLink.addClass("active");
                    } else {
                        $currLink.removeClass("active");
                    }
                });
            });
        },
        goToTop: function() {
            jQuery(".persone_totop").on('click', function(e) {
                e.preventDefault();
                jQuery("html, body").animate({
                    scrollTop: 0
                }, 'slow');
                return false;
            });
        },
        goToTopToggle: function() {
            var toTop = jQuery(".persone_totop"),
                $window = jQuery(window);
            $window.on('scroll', function() {
                if (toTop.length) {
                    var topOffSet = toTop.offset().top;
                    if (topOffSet > 1000) {
                        toTop.addClass('opened');
                    } else {
                        toTop.removeClass('opened');
                    }
                }
            });
        },
        smoothScroll: function() {
            const $smoothLink = jQuery(".smoothScroll");
            $body.scrollspy({
                target: "#nav",
                offset: 100
            });
            $smoothLink.on('click', function() {
                if (this.hash !== "") {
                    var hash = this.hash;
                    jQuery('html, body').stop().animate({
                        scrollTop: jQuery(hash).offset().top
                    }, 1500, "easeInOutExpo", function() {
                        window.location.hash = hash;
                    });
                }
            });
        },
        jarallax: function() {
            const $jarallax = jQuery('.jarallax');
            if ($jarallax.length > 0) {
                $jarallax.jarallax({
                    speed: 0.5,
                    imgWidth: 1920,
                    imgHeight: 1280
                });
            }
        },
        navToggle: function() {
            $link.on("click", function() {
                if (jQuery(".navbar-toggler").css("display") !== "none") {
                    jQuery(".navbar-toggler").trigger("click");
                }
            });
        },
        ripples: function() {
            if ($body.hasClass('rip')) {
                const $home = jQuery('#home');
                $home.ripples({
                    resolution: 512,
                    dropRadius: 20,
                    perturbance: 0.04,
                });
            }
        },
        pluginsInit: function() {
            new WOW().init();
        },
        isotope: function() {
            /* Not Used */
            const $folioItems = jQuery(".folio-items"),
                $folioFilter = jQuery(".folio-filter ul li");
            if ($folioItems.length) {
                const $elements = $folioItems;
                $elements.isotope();
                $folioFilter.on("click", function() {
                    $folioFilter.removeClass("current");
                    jQuery(this).addClass("current");
                    const selector = jQuery(this).attr("data-filter");
                    $folioItems.isotope({
                        filter: selector,
                        animationOptions: {
                            duration: 750,
                            easing: "linear",
                            queue: false,
                        },
                    });
                });
            }
        },
        owl: function() {
            const $owlDemo = jQuery("#owl-demo");
            $owlDemo.owlCarousel({
                autoPlay: 7000,
                stopOnHover: true,
                navigation: false,
                paginationSpeed: 1000,
                goToFirstSpeed: 2000,
                singleItem: true,
                autoHeight: true,
            });
        }
    }

}
jQuery(function() {
    Persone.init();
});

// Contact Form
function submit_form() {
    "use strict";
    //Variable declaration and assignment
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        fullname = jQuery("#fullname").val(),
        email = jQuery("#email").val(),
        message = jQuery("#message").val(),
        dataString = {
            'fullname': fullname,
            'email': email,
            'message': message,
            'submitted': '1'
        };

    if (fullname === "") { //Validation against empty field for fullname
        jQuery("#response_brought").html('<br clear="all"><div class="form_info" align="left">Please enter your fullname in the required field to proceed. Thanks.</div>');
        jQuery("#fullname").focus();
    } else if (email === "") { //Validation against empty field for email address
        jQuery("#response_brought").html('<br clear="all"><div class="form_info" align="left">Please enter your email address in the required email field to proceed. Thanks.</div>');
        jQuery("#email").focus();
    } else if (reg.test(email) === false) { //Validation for working email address
        jQuery("#response_brought").html('<br clear="all"><div class="form_info" align="left">Sorry, your email address is invalid. Please enter a valid email address to proceed. Thanks.</div>');
        jQuery("#email").focus();
    } else if (message === "") { //Validation against empty field for email message
        jQuery("#response_brought").html('<br clear="all"><div class="form_info" align="left">Please enter your message in the required message field to proceed. Thanks.</div>');
        jQuery("#message").focus();
    } else {
        //Show loading image
        jQuery("#response_brought").html('<br clear="all"><div align="left" style=" padding-top:6px; margin-left:100px; margin-top:15px;"><font style="font-family:Verdana, Geneva, sans-serif; font-size:12px; color:black;">Please wait</font> <img src="control/img/loading.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div>');

        $.post('contact_form.php', dataString, function(response) {
            //Check to see if the message is sent or not
            var response_brought = response.indexOf('Congrats');
            if (response_brought !== -1) {
                //Clear all form fields on success
                jQuery(".contact-form").slideUp(500);


                //Display success message if the message is sent
                jQuery("#response_brought").html(response);


                //Remove the success message also after a while of displaying the message to the user
                setTimeout(function() {
                    jQuery("#response_brought").html('');
                }, 10000);
            } else {
                //Display error message is the message is not sent
                jQuery(".contact-form").slideUp(500);
                jQuery("#response_brought").html(response);
            }
        });
    }
}