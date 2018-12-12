// images
'use strict';
var images = (function() {
  // cache
  var image = document.getElementById('modal-image-img');
  var link = document.getElementById('modal-image-link');
  var hash = '#dialog-image';

  // wrap all <img /> with <a href="image-[src]"><img /></a> to trigger expand modal
  function init() {
    var images = _scrapeImages();
    _wrapImages(images);
    _addRoute();
  }

  function _scrapeImages() {
    var images = document.getElementsByTagName('img');
    var output = []
    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      if (image.parentElement.tagName !== 'A') {
        output.push(image);

      }
    }
    return output;
  }

  function _wrapImages(images) {
    for (var i = 0; i < images.length; i++) {
      var image = images[i]
      var wrapper = document.createElement('a');
      var src = image.getAttribute('src');
      var href = hash + "?src=" + src;
      wrapper.setAttribute('href', href);
      image.parentNode.insertBefore(wrapper, image);
      wrapper.appendChild(image);
    }
  }

  function _addRoute() {
    router.add(hash, function() {
      _displayRoute();
    });
  }

  function _displayRoute() {
    var src = utils.readQueryString('src');
    if(src.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      if (!src) return;
      progress.track('viewed modal image ' + src);
      modals.toggle('modal-image', 'dialog');
      link.setAttribute('href', src);
      image.setAttribute('src', src);
    }
  }

  return {
    init: init
  };
})();