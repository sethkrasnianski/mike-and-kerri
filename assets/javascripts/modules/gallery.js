;(function($) {
  var $modal = $('#modal');
  var $image = $modal.find('img');
  var $galleryImage = $('#gallery img.col-1-4');
  var $body = $('body');

  // Gallery modal handling
  function getImageMeta(ctx) {
    var src  = $(ctx).attr('src');
    return  {
      src: src.slice(0, src.indexOf('.jpg') - 6) + ".jpg",
      alt: $(ctx).attr('alt'),
      orientation: $(ctx).data('orientation')
    };
  };

  function openModal() {
    var meta = getImageMeta(this);

    $image.attr('src', '');
    $image.attr('src', meta.src);
    $image.attr('alt', meta.alt);

    $modal.fadeIn();
    $modal.addClass(meta.orientation);
    $body.addClass('no-scroll');
  };

  function closeModal() {
    $modal.fadeOut(function() {
      $modal[0].className = "";
    });
    $body.removeClass('no-scroll');
  };

  $(document).on('keyup', function(e) {
    if (e.keyCode == 27) closeModal();
  });

  $galleryImage.on('click', openModal);
  $modal.on('click', closeModal);

  // Preload gallery images
  function preloadImage() {
    var src = $(this).attr('src');
    src = src.slice(0, src.indexOf('.jpg') - 6) + ".jpg";

    try {
      if($(this).hasClass('col-1-4')) {
        var _img = new Image();
        _img.src = src;
      }
    } catch (e) { }
  };

  $galleryImage.each(preloadImage);
})(jQuery);
