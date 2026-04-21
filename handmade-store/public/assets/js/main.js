(function ($) {
    'use strict';

    /*--
        Commons Variables
    -----------------------------------*/
    var $window = $(window),
        $body = $('body');

    /*--
        Custom script to call Background
        Image & Color from html data attribute
    -----------------------------------*/
    $('[data-bg-image]').each(function () {
        var $this = $(this),
            $image = $this.data('bg-image');
        $this.css('background-image', 'url(' + $image + ')');
    });
    $('[data-bg-color]').each(function () {
        var $this = $(this),
            $color = $this.data('bg-color');
        $this.css('background-color', $color);
    });

    /*--
        Header Sticky
    -----------------------------------*/
    $window.on('scroll', function () {
        if ($window.scrollTop() > 350) {
            $('.sticky-header').addClass('is-sticky');
        } else {
            $('.sticky-header').removeClass('is-sticky');
        }
    });

    /*--
        Sub Menu & Mega Menu Alignment
    -----------------------------------*/
    var subMenuMegaMenuAlignment = () => {
        var $this,
            $subMenu,
            $megaMenu,
            $siteMainMenu = $('.site-main-menu');

        $siteMainMenu.each(function () {
            $this = $(this);
            if ($this.is('.site-main-menu-left, .site-main-menu-right') && $this.closest('.section-fluid').length) {
                $megaMenu = $this.find('.mega-menu');
                $this.css('position', 'relative');
                if ($this.hasClass('site-main-menu-left')) {
                    $megaMenu.css({
                        left: '0px',
                        right: 'auto',
                    });
                } else if ($this.hasClass('site-main-menu-left')) {
                    $megaMenu.css({
                        right: '0px',
                        left: 'auto',
                    });
                }
            }
        });
        $subMenu = $('.sub-menu');
        if ($subMenu.length) {
            $subMenu.each(function () {
                $this = $(this);
                var $elementOffsetLeft = $this.offset().left,
                    $elementWidth = $this.outerWidth(true),
                    $windowWidth = $window.outerWidth(true) - 10,
                    isElementVisible = $elementOffsetLeft + $elementWidth < $windowWidth;
                if (!isElementVisible) {
                    if ($this.hasClass('mega-menu')) {
                        var $this = $(this),
                            $thisOffsetLeft = $this.parent().offset().left,
                            $widthDiff = $windowWidth - $elementWidth,
                            $left = $thisOffsetLeft - $widthDiff / 2;
                        $this
                            .attr('style', 'left:' + -$left + 'px !important')
                            .parent()
                            .css('position', 'relative');
                    } else {
                        $this.parent().addClass('align-left');
                    }
                } else {
                    $this.removeAttr('style').parent().removeClass('align-left');
                }
            });
        }
    };

    /*--
        Off Canvas Function
    -----------------------------------*/
    (function () {
        var $offCanvasToggle = $('.offcanvas-toggle'),
            $offCanvas = $('.offcanvas'),
            $offCanvasOverlay = $('.offcanvas-overlay'),
            $mobileMenuToggle = $('.mobile-menu-toggle');
        $offCanvasToggle.on('click', function (e) {
            e.preventDefault();
            var $this = $(this),
                $target = $this.attr('href');
            $body.addClass('offcanvas-open');
            $($target).addClass('offcanvas-open');
            $offCanvasOverlay.fadeIn();
            if ($this.parent().hasClass('mobile-menu-toggle')) {
                $this.addClass('close');
            }
        });
        $('.offcanvas-close, .offcanvas-overlay').on('click', function (e) {
            e.preventDefault();
            $body.removeClass('offcanvas-open');
            $offCanvas.removeClass('offcanvas-open');
            $offCanvasOverlay.fadeOut();
            $mobileMenuToggle.find('a').removeClass('close');
        });
    })();

    /*--
        Off Canvas Menu
    -----------------------------------*/
    function mobileOffCanvasMenu() {
        var $offCanvasNav = $('.offcanvas-menu, .overlay-menu'),
            $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');

        /*Add Toggle Button With Off Canvas Sub Menu*/
        $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"></span>');

        /*Category Sub Menu Toggle*/
        $offCanvasNav.on('click', 'li a, .menu-expand', function (e) {
            var $this = $(this);
            if ($this.attr('href') === '#' || $this.hasClass('menu-expand')) {
                e.preventDefault();
                if ($this.siblings('ul:visible').length) {
                    $this.parent('li').removeClass('active');
                    $this.siblings('ul').slideUp();
                    $this.parent('li').find('li').removeClass('active');
                    $this.parent('li').find('ul:visible').slideUp();
                } else {
                    $this.parent('li').addClass('active');
                    $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                    $this.closest('li').siblings('li').find('ul:visible').slideUp();
                    $this.siblings('ul').slideDown();
                }
            }
        });
    }
    mobileOffCanvasMenu();

    /*--
        Header Category
    -----------------------------------*/
    $('.header-categories').on('click', '.category-toggle', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass('active')) {
            $this.removeClass('active').siblings('.header-category-list').slideUp();
        } else {
            $this.addClass('active').siblings('.header-category-list').slideDown();
        }
    });

    /*--
        Shop Toolbar
    -----------------------------------*/

    // Filter Toggle
    $('.product-filter-toggle').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            $target = $this.attr('href');
        $this.toggleClass('active');
        $($target).slideToggle();
        $('.customScroll').perfectScrollbar('update');
    });

    // Column Toggle
    $('.product-column-toggle').on('click', '.toggle', function (e) {
        e.preventDefault();
        var $this = $(this),
            $column = $this.data('column'),
            $prevColumn = $this.siblings('.active').data('column');
        $this.toggleClass('active').siblings().removeClass('active');
        $('.products')
            .removeClass('row-cols-xl-' + $prevColumn)
            .addClass('row-cols-xl-' + $column);
        $.fn.matchHeight._update();
        $('.isotope-grid').isotope('layout');
    });

    /*--
        Custom Scrollbar (Perfect Scrollbar)
    -----------------------------------*/
    $('.customScroll').perfectScrollbar({
        suppressScrollX: !0,
    });

    /*--
        Select2
    -----------------------------------*/

    // Basic
    $('.select2-basic').select2();
    // No Search Field
    $('.select2-noSearch').select2({
        minimumResultsForSearch: Infinity,
    });

    // Custom Scrollbar For Select2 Result
    $('.select2-basic, .select2-noSearch').on('select2:open', function () {
        $('.select2-results__options').each(function () {
            var ps = new PerfectScrollbar($(this)[0], {
                suppressScrollX: true,
            });
        });
    });

    /*--
        Nice Select
    -----------------------------------*/
    $('.nice-select').niceSelect();

    /*--
        Match Height
    -----------------------------------*/
    $('.isotope-grid .product').matchHeight();

    /*--
        ion Range Slider
    -----------------------------------*/
    $('.range-slider').ionRangeSlider({
        skin: 'learts',
        hide_min_max: true,
        type: 'double',
        prefix: '$',
    });

    /*--
        Add To Wishlist
    -----------------------------------*/
    (function () {
        if (typeof mojs == 'undefined') {
            return;
        }
        var burst = new mojs.Burst({
            left: 0,
            top: 0,
            radius: {
                4: 32,
            },
            angle: 45,
            count: 14,
            children: {
                radius: 2.5,
                fill: ['#F8796C'],
                scale: {
                    1: 0,
                    easing: 'quad.in',
                },
                pathScale: [0.8, null],
                degreeShift: [13, null],
                duration: [500, 700],
                easing: 'quint.out',
            },
        });
        $('.add-to-wishlist').on('click', function (e) {
            var $this = $(this),
                offset = $this.offset(),
                width = $this.width(),
                height = $this.height(),
                coords = {
                    x: offset.left + width / 2,
                    y: offset.top + height / 2,
                };
            if (!$this.hasClass('wishlist-added')) {
                e.preventDefault();
                $this.addClass('wishlist-added').find('i').removeClass('far').addClass('fas');
                burst.tune(coords).replay();
            }
        });
    })();

    /*--
        Parallax
    -----------------------------------*/
    $.Scrollax();

    /*--
        Isotpe
    -----------------------------------*/
    var $isotopeGrid = $('.isotope-grid');
    var $isotopeFilter = $('.isotope-filter');
    $isotopeGrid.imagesLoaded(function () {
        $isotopeGrid.isotope({
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-sizer',
            },
        });
    });
    $isotopeFilter.on('click', 'button', function () {
        var $this = $(this),
            $filterValue = $this.attr('data-filter'),
            $targetIsotop = $this.parent().data('target');
        $this.addClass('active').siblings().removeClass('active');
        $($targetIsotop).isotope({
            filter: $filterValue,
        });
    });

    /*--
        MailChimp
    -----------------------------------*/
    $('#mc-form').ajaxChimp({
        language: 'en',
        callback: mailChimpResponse,
        // ADD YOUR MAILCHIMP URL BELOW HERE!
        url: 'http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef',
    });

    function mailChimpResponse(resp) {
        if (resp.result === 'success') {
            $('.mailchimp-success')
                .html('' + resp.msg)
                .fadeIn(900);
            $('.mailchimp-error').fadeOut(400);
        } else if (resp.result === 'error') {
            $('.mailchimp-error')
                .html('' + resp.msg)
                .fadeIn(900);
        }
    }

    /*--
        CountDown
    -----------------------------------*/
    $('[data-countdown]').each(function () {
        var $this = $(this),
            $finalDate = $this.data('countdown');
        $this.countdown($finalDate, function (event) {
            $this.html(
                event.strftime(
                    '<div class="count"><span class="amount">%-D</span><span class="period">Days</span></div><div class="count"><span class="amount">%-H</span><span class="period">Hours</span></div><div class="count"><span class="amount">%-M</span><span class="period">Minutes</span></div><div class="count"><span class="amount">%-S</span><span class="period">Seconds</span></div>'
                )
            );
        });
    });

    /*--
        Bootstrap
    -----------------------------------*/

    /* Accordion/Collapse */
    $('.collapse').on('show.bs.collapse', function (e) {
        $(this).closest('.card').addClass('active').siblings().removeClass('active');
    });
    $('.collapse').on('hide.bs.collapse', function (e) {
        $(this).closest('.card').removeClass('active');
    });

    /* Modal */
    $('#quickViewModal').on('shown.bs.modal', function (e) {
        $('.product-gallery-slider-quickview').slick({
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
            nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>',
        });
    });

    /*--
        Product Quantity
    -----------------------------------*/
    $('.qty-btn').on('click', function () {
        var $this = $(this);
        var oldValue = $this.siblings('input').val();
        if ($this.hasClass('plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $this.siblings('input').val(newVal);
    });

    /*--
        Post Share
    -----------------------------------*/
    $('.post-share').on('click', '.toggle', function () {
        var $this = $(this),
            $target = $this.parent();
        $target.hasClass('active') ? $target.removeClass('active') : $target.addClass('active');
    });

    /*--
        Magnific Popup
    -----------------------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe',
    });
    $('.image-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        fixedContentPos: false,
        gallery: {
            enabled: true,
        },
    });

    /*--
        Scroll Up
    -----------------------------------*/
    $.scrollUp({
        scrollText: '>',
    });

    /*--
        Single Product Gallery Popup
    -----------------------------------*/
    var $productPopupGalleryBtn = $('.product-gallery-popup'),
        $productPopupGallery = $productPopupGalleryBtn.data('images'),
        $openPhotoSwipe = function () {
            var pswpElement = $('.pswp')[0],
                items = $productPopupGallery,
                options = {
                    history: false,
                    focus: false,
                    closeOnScroll: false,
                    showAnimationDuration: 0,
                    hideAnimationDuration: 0,
                };
            new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options).init();
        };
    $productPopupGalleryBtn.on('click', $openPhotoSwipe);

    $('.product-zoom').each(function () {
        var $this = $(this),
            $image = $this.data('image');
        $this.zoom({
            url: $image,
        });
    });

    /*--
        Sticky Sidebar
    -----------------------------------*/
    $('.sticky-sidebar').stickySidebar({
        topSpacing: 60,
        bottomSpacing: 60,
        containerSelector: '.sticky-sidebar-container',
        innerWrapperSelector: '.sticky-sidebar-inner',
        minWidth: 992,
    });

    /*--
        Ajax Contact Form
    -----------------------------------*/
    $(function () {
        // Get the form.
        var form = $('#contact-form');
        // Get the messages div.
        var formMessages = $('.form-messege');
        // Set up an event listener for the contact form.
        $(form).submit(function (e) {
            // Stop the browser from submitting the form.
            e.preventDefault();
            // Serialize the form data.
            var formData = $(form).serialize();
            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData,
            })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    formMessages.removeClass('error text-danger').addClass('success text-success learts-mt-10').text(response);
                    // Clear the form.
                    form.find('input:not([type="submit"]), textarea').val('');
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    formMessages.removeClass('success text-success').addClass('error text-danger mt-3');
                    // Set the message text.
                    if (data.responseText !== '') {
                        formMessages.text(data.responseText);
                    } else {
                        formMessages.text('Oops! An error occured and your message could not be sent.');
                    }
                });
        });
    });

    /*--
        On Load Function
    -----------------------------------*/
    $window.on('load', function () {
        subMenuMegaMenuAlignment();
    });

    /*--
        Resize Function
    -----------------------------------*/
    $window.resize(function () {
        subMenuMegaMenuAlignment();
    });
})(jQuery);
