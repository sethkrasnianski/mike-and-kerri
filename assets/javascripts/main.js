;(function($) {
  var $window = $(window);
  var $marriage = $('#marriage');

  // Menu visibility
  function showMenu() {
    if ($window.scrollTop() >= $marriage.outerHeight() && $window.width() >= 560) {
      $('header').addClass('visible');
    } else {
      $('header').removeClass('visible');
    }
  };

  $window.on('resize', _.debounce(showMenu, 500, true));
  $window.on('scroll', _.throttle(showMenu, 500, true));
  showMenu();

  // Hero full size
  function resizeHero() {
    $marriage.height($window.height() - (parseInt($marriage.css('padding-top')) * 2));
  };

  $window.on('resize', _.debounce(resizeHero, 500, true));
  resizeHero();

  // init WOW
  new WOW().init();

  // init isotope
  $window.on('load', function() {
    $('#gallery .images').isotope({
      itemSelector: 'img'
    });
  });
})(jQuery);
