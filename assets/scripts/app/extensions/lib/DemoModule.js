"use strict";
define(["jquery"], function (jQuery) {
  var $j = jQuery.noConflict();

  var DemoModule = (function() {
    var _object;

    /**
     *
     * @param {number} px - pixels to move
     * @param {string} axis - top or left
     */
    function _move(px, axis, callback) {
      if (axis == "top") {
        _object.animate({
          top: "+=" + px
        }, 500, callback);
      } else if ( axis == "left") {
        _object.animate({
          left: "+=" + px
        }, 500);
      }
      if (typeof callback != "function") {
        callback = function(){};
      }
      return callback();
    }

    function DemoModule(selector) {
      _object = $j(selector);
      if (_object.length == 1) {
        _object.css("position", "relative");
        return this;
      } else {
        return false;
      }
    }

    DemoModule.prototype = {
      moveV: function(px) {
        _move(px, "top");
        return this;
      },
      moveH: function(px) {
        _move(px, "left");
        return this;
      }
    };

    return DemoModule;
  })();

  return DemoModule;
});