define(function() {
  return {
    /**
     * Creates a new Class Instance
     * @param obj
     * @param arg
     * @returns {*}
     */
    createInstance: function(obj, arg) {

      // Create array out of arguments
      arg = Array.prototype.slice.call(arg);

      // add empty value at position 0 to make sure all parameters pass correctly
      arg.splice(0, 0, undefined);

      // This adds all parameters from getInstance to the constructor
      return new (obj.bind.apply(obj, arg))();
    }
  }
});