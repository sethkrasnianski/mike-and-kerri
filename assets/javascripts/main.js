;(function($) {
  var $window = $(window);
  var $marriage = $('#marriage');
  var initial = true;

  // Menu visibility
  function showMenu() {
    if(!initial) {
      if ($window.scrollTop() >= $marriage.outerHeight() && $window.width() >= 560) {
        $('header').addClass('visible');
      } else {
        $('header').removeClass('visible');
      }
    }
  };

  $window.on('resize', _.debounce(showMenu, 500, true));
  showMenu();

  // Hero full size
  function resizeHero() {
    $marriage.height($window.height() - (parseInt($marriage.css('padding-top')) * 2));
  };

  $window.on('resize', _.debounce(resizeHero, 500, true));
  resizeHero();

  // Jump to
  function scrollTo() {
    var target = $($(this).attr('href'));

    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  };

  $('[href*=#]').on('click', scrollTo);

  // init isotope
  $window.on('load', function() {
    initial = false;
    $('#gallery .images').isotope({
      itemSelector: 'img'
    });
  });

  // inView
  function inView(el) {
    var middle = $(el).eq(1);
    var bottom = $(window).height() - middle.offset().top - middle.height();
    if ($window.scrollTop() >= ($('#marriage').height() / 1.25) && $window.width() >= 560) {
      $(el).addClass('inview');
    }
  };

  // on Scroll
  function onScroll() {
    showMenu();
    inView('#story article');
  };

  $window.on('scroll', _.throttle(onScroll, 500, true));
})(jQuery);
