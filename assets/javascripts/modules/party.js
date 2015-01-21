;(function($) {
  var $gender = $('#party .gender button');

  function switchGender() {
    $gender.removeClass('active');
    $(this).addClass('active');
    $('.party').removeClass('active');
    $('#' + $(this).data('party')).addClass('active');
  };

  $gender.on('click', switchGender);

  // Bride's Maids
  var bridesmaidsContainer = "#bridesmaids"
  window.bridesmaids = new Slidetastic.Slider(0, bridesmaidsContainer, bridesmaidsContainer + " li");

  $(bridesmaidsContainer).find('.control.next').on('click', function() {
    bridesmaids.next();
  });

  $(bridesmaidsContainer).find('.control.last').on('click', function() {
    bridesmaids.last();
  });

  // Groom's Maids
  var groomsmenContainer = "#groomsmen"
  window.groomsmen = new Slidetastic.Slider(0, groomsmenContainer, groomsmenContainer + " li");

  $(groomsmenContainer).find('.control.next').on('click', function() {
    groomsmen.next();
  });

  $(groomsmenContainer).find('.control.last').on('click', function() {
    groomsmen.last();
  });

  // goTo
  function goTo() {
    window[$(this).closest('.party').attr('id')].goTo($(this).index())
  };

  $('.faces img').on('click', goTo);
})(jQuery);
