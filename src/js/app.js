$(document).ready(function () {

    let _window = $(window);
    let _document = $(document);

    function pageReady() {
        // вспомогательные скрипты, библиотеки
        legacySupport();
        imgToSvg();
        formSend();
        activeHeaderScroll();
        // инициализация библиотек
        initSliders();
        initPopups();
        initMasks();
        initSelectric();
        initLazyPicture();
        // кастомные скрипты
        burgerMenu();
        scrollTop();
        sectionNavigation();
    }

    pageReady();

    function legacySupport() {
        svg4everybody();
    }

    function sectionNavigation() {
        _document
            .on('click', '[href="#"]', function (e) {
                e.preventDefault();
            })
            .on('click', 'a[href^="#section"]', function () {
                let el = $(this).attr('href');
                $('body, html').animate({
                    scrollTop: $(el).offset().top
                }, 1000);
                return false;
            })
    }

    function activeHeaderScroll() {

        let header = $('header.header');
        _window.on('scroll load', function () {
            if (_window.scrollTop() >= 10) {
                header.addClass('active');
            } else {
                header.removeClass('active');
            }
        });

    }

    function initPopups() {

        // Magnific Popup
        let startWindowScroll = 0;
        $('.js-popup').magnificPopup({
            type: 'inline',
            fixedContentPos: true,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'popup-buble',
            callbacks: {
                beforeOpen: function () {
                    startWindowScroll = _window.scrollTop();
                },
                close: function () {
                    _window.scrollTop(startWindowScroll);
                }
            }
        });

        $('.js-popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Загрузка #%curr%...',
            mainClass: 'popup-buble',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
        });

    }

    function closeMfp() {
        $.magnificPopup.close();
    }

    function initSliders() {

    }

    function initMasks() {
        //$(".js-dateMask").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
        $("input[type='tel']").mask("+7 (000) 000-0000");
    }

    function initSelectric() {
        $('select').selectric({
            maxHeight: 300,
            arrowButtonMarkup: '<b class="button"></b>',

            onInit: function (element, data) {
                var $elm = $(element),
                    $wrapper = $elm.closest('.' + data.classes.wrapper);

                $wrapper.find('.label').html($elm.attr('placeholder'));
            },
            onBeforeOpen: function (element, data) {
                var $elm = $(element),
                    $wrapper = $elm.closest('.' + data.classes.wrapper);

                $wrapper.find('.label').data('value', $wrapper.find('.label').html()).html($elm.attr('placeholder'));
            },
            onBeforeClose: function (element, data) {
                var $elm = $(element),
                    $wrapper = $elm.closest('.' + data.classes.wrapper);

                $wrapper.find('.label').html($wrapper.find('.label').data('value'));
            }
        });
    }

    function initLazyPicture() {
        $('.lazy').lazy({
            effect: 'fadeIn',
            effectTime: 200
        });
    }

    function imgToSvg() {
        $('img.svg').each(function () {
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function (data) {
                var $svg = $(data).find('svg');
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }
                $svg = $svg.removeAttr('xmlns:a');
                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }
                $img.replaceWith($svg);
            }, 'xml');
        });
    }

    function burgerMenu() {

        let burger = $('.burger');
        let menu = $('nav.nav-header .container > ul');

        $(document).mouseup(function (e) {

            if (burger.is(e.target) || burger.has(e.target).length === 1) {
                if (menu.hasClass('active')) {
                    menu.removeClass('active');
                    burger.removeClass('active');
                } else {
                    menu.addClass('active');
                    burger.addClass('active');
                }
            } else if (!menu.is(e.target) && menu.has(e.target).length === 0 && menu.hasClass('active')) {
                menu.removeClass('active');
                burger.removeClass('active');
            }

        });

    }

    function scrollTop() {
        _window.scroll(function () {
            if ($(this).scrollTop() > 250) {
                $('#back-top').fadeIn(300);
            } else {
                $('#back-top').fadeOut(300);
            }
        });

        $('#back-top').click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 750);
            return false;
        });
    }

    function formSend() {
        document.addEventListener('wpcf7mailsent', function (event) {
            let el = $('#modal-form-tnx');
            if (el.length) {
                $.magnificPopup.open({
                    items: {
                        src: el
                    },
                    type: 'inline',
                    fixedContentPos: true,
                    fixedBgPos: true,
                    overflowY: 'auto',
                    closeBtnInside: true,
                    preloader: false,
                    midClick: true,
                    removalDelay: 300,
                    mainClass: 'popup-buble',
                });
            }
        }, false);
    }

});