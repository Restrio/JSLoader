define(["InstanceCreator"], function(InstanceCreator) {
  return function() {
    // Private Scope

    var _Module,
      _privVar = null;

    function _setPrivVar(val) {
      _privVar = val;
    }

    // Our Constructor
    _Module = function() {};

    _Module.prototype = {

      // Public Scope
      publicVar: null,

      setPrivVar: function(val) {
        _setPrivVar(val);
      },

      setPublicVar: function(val) {
        this.publicVar = val;
      },

      setBothVars: function(val) {
        _setPrivVar(val);
        this.setPublicVar(val);
      }
    };

    return InstanceCreator.createInstance(_Module, arguments);
  }
});