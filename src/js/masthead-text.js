function textWriter(el, text, i, cb) {
  if (!i) {
    i = 0;
    el.innerHTML = '';
  }
  if (i >= text.length) {
    cb();
    return;
  }

  el.innerHTML += text[i];
  i++;
  setTimeout(textWriter.bind(null, el, text, i, cb), 50);
}

$(document).ready(function() {
  var $mastheadTextEl = $('#js-masthead-text');
  if (!$mastheadTextEl.length) {
    return;
  }

  var mastheadTexts = [
    'Modern web app development',
    'Machine learning and automation',
    'Linux server administration'];
  var mastheadTextIdx = 0;
  var mastheadTextUpdating = false;

  function mastheadTextUpdate() {
    if (mastheadTextUpdating) {
      return;
    }
    mastheadUpdating = true;
    mastheadTextIdx++;
    if (mastheadTextIdx >= mastheadTexts.length) {
      mastheadTextIdx = 0;
    }
    return textWriter(
      $mastheadTextEl[0],
      mastheadTexts[mastheadTextIdx],
      0,
      function() {
        mastheadTextUpdating = false;
      });
  }

  setInterval(mastheadTextUpdate, 10000);
});
