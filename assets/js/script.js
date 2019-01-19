(function($){
  "use strict";

  window.deco = $.extend({}, {
    winWidth: $(window).width(),
    winHeight: $(window).height(),
    winScroll: $(window).scrollTop(),
    preloader: $('.preloader'),
    modalWindow: $('.modal'),

    init: function () {

      $('body')
        .addClass('os-' + window.jscd.os.toLowerCase())
				.addClass('browser-' + window.jscd.browser.toLowerCase())
				.attr('data-os-version', window.jscd.osVersion.toLowerCase());

      $(window).scroll(function(){
        deco.winScroll = $(window).scrollTop();
      });

      $(window).resize(function(){
        deco.winWidth = $(window).width();
        deco.winHeight = $(window).height();
        deco.winScroll = $(window).scrollTop();
      });

      deco.initModal();
      deco.initPreloader();
    },

    initModal: function(){

      deco.modalWindow.bind('open', function(e, modalType){
        $('[data-modal-type="' + modalType + '"]').addClass("active");
      });

      deco.modalWindow.bind('close', function(e, modalType){
        if (typeof modalType !== 'undefined') {
          $('[data-modal-type="' + modalType + '"]').removeClass("active");
        } else {
          deco.modalWindow.removeClass("active");
        }
      });

      $(document).on('keyup', function (e) {
        if (e.which == 27) {
          e.preventDefault();
          deco.modalWindow.trigger('close');
        }
      });

      $(document).on('click', '.btn-modal-close', function(e){
        e.preventDefault();
        var modalType = $(this).closest('.modal-widow').data('modal-type');
        if (!$(this).closest('.modal-widow').hasClass("modal-widow--no-close")) {
          deco.modalWindow.trigger('close', modalType);
        }
      });

      deco.modalWindow.find('.modal-center').click(function(e){
        var modalType = $(this).closest('.modal-widow').data('modal-type');
        if ($(this).has(e.target).length === 0 && !$(this).closest('.modal-widow').hasClass("modal-widow--no-close")){
          deco.modalWindow.trigger('close', modalType);
        }
      });

      // $('.modal__scroll').each(function(){
      //   $(this).mCustomScrollbar({
      //     scrollbarPosition: 'outside',
      //     scrollInertia: 300,
      //     mouseWheel:{
      //       preventDefault: true
      //     }
      //   });
      // });
    },

    initPreloader: function (event) {
      deco.preloader.bind('open', function(){
        deco.preloader.addClass("active");
      });
      deco.preloader.bind('close', function(){
        deco.preloader.removeClass("active");
      });
    },


  });

  deco.init();

})(jQuery);


function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

document.addEventListener('DOMContentLoaded', function(){
  //detection it is *hover* device or not
  var hasHoverClass = false;
  function watchForHover() {
    var container = document.body;
    var lastTouchTime = 0;

    function enableHover() {
        // filter emulated events coming from touch events
        if (new Date() - lastTouchTime < 500) return;
        if (hasHoverClass) return;

        container.className += ' hasHover';
        hasHoverClass = true;
    }

    function disableHover() {
        if (!hasHoverClass) return;

        container.className = container.className.replace(' hasHover', '');
        hasHoverClass = false;
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }

    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', disableHover, true);
    document.addEventListener('mousemove', enableHover, true);

    enableHover();
}

watchForHover();

  //header
  var navigationBtn = document.getElementById('nav-btn');
  var header = document.getElementById('header');
  var lang = document.getElementById('lang');
  navigationBtn.addEventListener('click', function(){
    navigationBtn.classList.toggle('is-active');
    header.classList.toggle('mobile-open');
  });

  lang.addEventListener('click', function(){
    lang.classList.toggle('active');
  })
  window.onscroll = function() {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if(scrolled === 0){
    header.style.paddingBottom = 0;
    header.style.paddingTop = '47px';
  }else{
    header.style.paddingTop = '20px';
    header.style.paddingBottom = '15px';
  }
}
  const NAV = document.getElementById('nav');
  const SERVICES_NAV = document.getElementById('services-nav');
  const TESTIMONIALS_NAV = document.getElementById('testimonials-nav');
  const CONTACT_NAV = document.getElementById('contact-nav');
  var headerHeight = header.offsetHeight;
  NAV.addEventListener('click', function(e){

    if(screen.width <= 768){
      header.classList.remove('mobile-open');
      navigationBtn.classList.remove('is-active');
    }
    switch(e.target){
      case SERVICES_NAV:
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#services").offset().top - (headerHeight + 15)
      }, 1000);
      break;
      case TESTIMONIALS_NAV:
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#testimonials").offset().top - (headerHeight + 15)
      }, 1000);
      break;
      case CONTACT_NAV:
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#contact").offset().top - (headerHeight + 15)
      }, 1000);
      break;
    }
  });
//prices section
  const OPTI_INFO = document.getElementById('optimization-info');
  const WORK_INFO = document.getElementById('work-info');
  const LAW_INFO = document.getElementById('law-info');
  const DEVELOP_INFO = document.getElementById('develop-info');
  const OPTIMIZATION = document.getElementById('optimization');
  const DEVELOP = document.getElementById('develop');
  const WORK = document.getElementById('work');
  const LAW = document.getElementById('law');

  window.addEventListener('resize', function(event){
  OPTIMIZATION.classList.remove('active');
  DEVELOP.classList.remove('active');
  WORK.classList.remove('active');
  LAW.classList.remove('active');
  });
   if(!hasHoverClass || screen.width <= 768){
    $(OPTI_INFO).on('click',function(){
      console.log('click')
       $(OPTIMIZATION).toggleClass('active');
     });
   }else{
     $(OPTI_INFO).hover(
        function () {
          $(OPTIMIZATION).addClass('active');
        },
        function () {
          $(OPTIMIZATION).removeClass("active");
        }
      );
   }


    if(!hasHoverClass || screen.width <= 768){
     $(WORK_INFO).click(function(){
        $(WORK).toggleClass('active');
      });
    }else{
      $(WORK_INFO).hover(
         function () {
           $(WORK).addClass('active');
         },
         function () {
           $(WORK).removeClass("active");
         }
       );
    }

     if(!hasHoverClass || screen.width <= 768){
      $(LAW_INFO).click(function(){
        $(LAW).toggleClass('active');
       });
     }else{
       $(LAW_INFO).hover(
          function () {
            $(LAW).addClass('active');
          },
          function () {
            $(LAW).removeClass("active");
          }
        );
     }

      if(!hasHoverClass || screen.width <= 768){
       $(DEVELOP_INFO).click(function(){
          $(DEVELOP).toggleClass('active');
        });
      }else{
        $(DEVELOP_INFO).hover(
           function () {
             $(DEVELOP).addClass('active');
           },
           function () {
             $(DEVELOP).removeClass("active");
           }
         );
      }
  //video section main
  const VIDEO_PLAYER_MAIN = document.getElementById('video-player');
  const MAIN_CONTROLL = document.getElementById('play-button');
  const MAIN = document.getElementById('main');

  MAIN_CONTROLL.addEventListener('click', function(){
    VIDEO_PLAYER_MAIN.setAttribute('controls', 'controls');
    MAIN.classList.remove('first-play');
    VIDEO_PLAYER_MAIN.play();
    MAIN_CONTROLL.style.display='none';
  });
  VIDEO_PLAYER_MAIN.addEventListener('play', function(){
    MAIN.classList.toggle('hidden');
  });
  VIDEO_PLAYER_MAIN.addEventListener('pause', function(){
    VIDEO_PLAYER_MAIN.removeAttribute('controls');
    MAIN.classList.toggle('hidden');
    MAIN_CONTROLL.style.display='block';
  });

  //testimonials section
  const LOAD_MORE = document.getElementById('loadMore');
  const ADDITIONAL_FIRST = document.getElementById('additional1');
  const ADDITIONAL_SECOND = document.getElementById('additional2');
  const ADDITIONAL_THIRD = document.getElementById('additional3');
  const SLICK_CONTAINER = document.getElementById('slickContainer');
  if(screen.width <= 991){
    $('.testimonials--blocks').slick({
      infinite:false,
      prevArrow:'<button type="button" class="slick-prev icon-prev"></button>',
      nextArrow:'<button type="button" class="slick-next icon-next"></button>',
      dots: true
    });

    LOAD_MORE.addEventListener('click', function(){
        $('.testimonials--blocks').slick('slickAdd', ADDITIONAL_FIRST);
        $('.testimonials--blocks').slick('slickAdd', ADDITIONAL_THIRD);
        $('.testimonials--blocks').slick('slickAdd', ADDITIONAL_SECOND);
        LOAD_MORE.style.display='none';
        $('.testimonials--blocks').slick('slickGoTo', 3);
    });
  }else{
    LOAD_MORE.addEventListener('click', function(){
        SLICK_CONTAINER.append(ADDITIONAL_SECOND,ADDITIONAL_THIRD, ADDITIONAL_FIRST);
        LOAD_MORE.style.display='none';
    });
  }
  const ADDITIONAL_BTN = document.getElementById('additional-btn');
  const CHECKBOX_GROUP = document.getElementById('checkBoxGroup');
  ADDITIONAL_BTN.addEventListener('click', function(){
    CHECKBOX_GROUP.classList.toggle('active');
  });

  $('.main--order').on('click', function(e){
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#services").offset().top - (headerHeight + 15)
    }, 1000);
  });
  $('.modal--order').on('click', function(){
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#contact").offset().top - (headerHeight + 15)
    }, 1000);
  });
  //popup
  const POP_CLOSE = document.getElementById('popup-close');
  const POPUP = document.getElementById('popup');
  POP_CLOSE.addEventListener('click', function(){
    POPUP.classList.toggle('open');
  });
  //form
  $(function() {
      $('form').submit(function(e) {
        var $form = $(this);
        $.ajax({
          type: $form.attr('method'),
          url: $form.attr('action'),
          data: $form.serialize()
        }).done(function() {
          POPUP.classList.toggle('open');
          $('form').find('input[type=text],input[type=tel],input[type=email], textarea').val('');
          $('form').find('input[type=checkbox]').prop('checked', false);
          console.log($form.serialize());
        }).fail(function() {
          console.log('error');
        });
        //отмена действия по умолчанию для кнопки submit
        e.preventDefault();
      });
    });
});
