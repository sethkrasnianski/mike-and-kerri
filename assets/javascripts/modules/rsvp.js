;(function($) {
  var $form = $('#rsvp form');

  function submit(e) {
    e.preventDefault();
    var data   = $(this).serialize()
      , action = $(this).attr('action');
    $.post(action, data)
      .done(handleSuccess)
      .fail(handleError);
  };

  function handleSuccess(res) {
    displayResponse(res);
  };

  function handleError(res) {
    displayResponse(res);
  };

  function displayResponse(res) {
    var $response = $form.find('.response');
    $response.text('');
    $response.text(res);
    $response.addClass('failure');

    if(res.indexOf('name') == -1) {
      $response.removeClass('failure');
      $response.addClass('success');
      $form.find('.form-area').hide()
    }
  };

  $form.on('submit', submit);
})(jQuery);
