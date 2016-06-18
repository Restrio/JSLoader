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
    function _move(px, duration, axis, callback) {
      if (typeof callback != "function") {
        callback = function(){};
      }

      if (duration == undefined) {
        duration = 500;
      }

      // Move up or down
      if (axis == "top") {
        _object.animate({
          top: "+=" + px
        }, duration, callback);

      // Move left or right
      } else if ( axis == "left") {
        _object.animate({
          left: "+=" + px
        }, duration);
      }
      return callback();
    }

    /**
     *
     * @param {string} selector - jQuery-selector
     * @returns {DemoModule|bool} - false if invalid selector
     * @constructor
     */
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
      /**
       * Move object X Pixels down
       * Negative Number for up
       * @param {number} px
       * @chaineable
       */
      moveV: function(px, duration) {
        _move(px, duration, "top");
        return this;
      },

      /**
       * Move object X Pixels right
       * Negative Number for left
       * @param {number} px
       * @chainable
       */
      moveH: function(px, duration) {
        _move(px, duration, "left");
        return this;
      },

      wait: function(duration) {
        _object.delay(duration);
        return this;
      }
    };

    return DemoModule;
  })();

  return DemoModule;
});