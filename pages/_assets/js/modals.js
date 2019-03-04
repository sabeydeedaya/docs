// modals
'use strict';
var modals = (function() {
  // properties
  var cache = {};

  // main
  _addCache();
  function _addCache() {
    var modals = document.getElementsByClassName('modal');
    for (var i = 0; i < modals.length; i++) {
      var modal = modals[i];
      var id = modal.id;
      var type = modal.classList.contains('notification') ? 'notification' : 'dialog';
      var children = modal.children;
      var background = null;
      var close = null;
      for (var j = 0; j < children.length; j++) {
        var child = children[j];
        var subchildren = child.children;
        background = (child.classList.contains('modal-background')) ? child : background;
        for (var k = 0; k < subchildren.length; k++) {
          var subchild = subchildren[k];
          close = (subchild.classList.contains('modal-close')) ? subchild : close;
          break;
        }
      }
      _addListener(id, type, background, close);
      cache[id] = modal;
    }
  }

  function _addListener(id, type, background, close) {
    // need separate function because of closure binding within .addEventListener
    close.addEventListener('click', function(event) {
      toggle(id, type);
    });
    if (type === 'notification') return;
    background.addEventListener('click', function(event) {
      toggle(id, type);
    });
  }

  function toggle(id, type, duration) {
    var modal = cache[id];
    if (!modal) return;
    var isModalOpen = modal.classList.contains('active');
    var time = (duration) ? duration : 0;
    var types = (type === 'notification') ? 'notification' : 'dialog';

    isModalOpen ? _handleModalClose(modal) : _handleModalOpen(modal)

    if (types === 'notification') {
      setTimeout(function() {
        _handleModalClose(modal);
      }, time);
    }
  }

  function _handleModalClose(modal) {
    modal.classList.remove('active');
    document.documentElement.classList.remove('modal');
    router.remove();
  }

  function _handleModalOpen(modal) {
    modal.classList.add('active');
    document.documentElement.classList.add('modal');
  }

  function clear() {
    for (var key in cache) {
      if (cache.hasOwnProperty(key)) {
        var modal = cache[key];
        modal.classList.remove('active');
      }
    }
    document.documentElement.classList.remove('modal');
  }

  // public
  return {
    toggle: toggle,
    clear: clear
  };
})();
