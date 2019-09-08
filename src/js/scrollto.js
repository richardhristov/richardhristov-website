$(document).ready(function() {
  var scrolling = false;

  $('.js-scrollto-swipe').each(function() {
    var $el = $(this);
    var $target = $($el.data('target'));
    var $scroll = $($el.data('scroll'));

    var swipeStartX = null;
    var swipeStartY = null;

    $el[0].addEventListener('touchstart', swipeStart, false);
    $el[0].addEventListener('touchmove', swipeMove, false);

    function swipeStart(e) {
      swipeStartX = e.touches[0].clientX;
      swipeStartY = e.touches[0].clientY;
    }
  
    function swipeMove(e) {
      if (swipeStartX === null || swipeStartY === null || scrolling) {
        return;
      }
  
      var swipeCurrentX = e.touches[0].clientX;
      var swipeCurrentY = e.touches[0].clientY;
  
      var diffX = swipeStartX - swipeCurrentX;
      var diffY = swipeStartY - swipeCurrentY;
  
      if (Math.abs(diffX) < Math.abs(diffY) && diffY > 0) {
        scrolling = true;
        $scroll.animate({
          scrollTop: $target.offset().top
        }, 1000, 'swing', function() { scrolling = false; });
      }
  
      swipeStartX = null;
      swipeStartY = null;
  
      e.preventDefault();
    }
  });

  $('.js-scrollto-click').click(function() {
    if (scrolling) {
      return;
    }

    var $el = $(this);
    var $target = $($el.data('target'));
    var $scroll = $($el.data('scroll'));

    scrolling = true;
    $scroll.scrollTop(0);
    $scroll.animate({
      scrollTop: $target.offset().top
    }, 1000, 'swing', function() { scrolling = false; });
  });
});
