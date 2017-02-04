define(["InstanceCreator", "jquery"], function (InstanceCreator, jQuery) {
  "use strict";
  return function() {
    var $j = jQuery.noConflict(),
      _object,
      DemoModule;

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

    DemoModule = function(selector) {
      _object = $j(selector);
      if (_object.length == 1) {
        _object.css("position", "relative");
      } else {
        return {};
      }
    };

    /**
     *
     * @param {string} selector - jQuery-selector
     * @returns {DemoModule|bool} - false if invalid selector
     * @constructor
     */
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

      /**
       *
       * @param {number} duration
       * @chainable
       */
      wait: function(duration) {
        _object.delay(duration);
        return this;
      }
    };

    return InstanceCreator.createInstance(DemoModule, arguments);
  };
});
