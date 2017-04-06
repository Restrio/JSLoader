define(function() {
  "use strict";

  /**
   * IE8 fix for indexOf
   * @type {number}
   */
  Array.prototype.indexOf = Array.prototype.indexOf || function(value) {
    for (var i in this) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  /**
   * IE8 fix for bind
   * @type {Function}
   */
  Function.prototype.bind = Function.prototype.bind || function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP    = function() {},
      fBound  = function() {
        return fToBind.apply(this instanceof fNOP && oThis
            ? this
            : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
});