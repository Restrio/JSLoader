define(["JS"], function (JS) {
  "use strict";

  return function() {
    var _object,
      _colors,
      _currentIndex,
      _interval,
      DemoModule;

    DemoModule = function(selector) {
      _object = document.querySelector(selector);
      if (_object !== null) {
        _object.style.backgroundColor = "white";
        _object.style.borderStyle = "solid";
        _object.style.borderColor = "black";
        _object.style.borderWidth = "1px";
      } else {
        return {};
      }
    };

    DemoModule.prototype = {
      setColorInterval: function(colors, time) {
        if (_interval === undefined) {
          _colors = colors;
          _currentIndex = 0;

          _interval = setInterval(function() {
            _object.style.backgroundColor = _colors[_currentIndex];

            if (_currentIndex+1 < _colors.length) {
              _currentIndex++;
            } else {
              _currentIndex = 0;
            }
          }, time);
        }
      },
      clearInterval: function() {
        clearInterval(_interval);
        _interval = undefined;
        _colors = undefined;
        _currentIndex = undefined;
      }
    };

    return JS.getCreater().createInstance(DemoModule, arguments);
  };
});
