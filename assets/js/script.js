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
