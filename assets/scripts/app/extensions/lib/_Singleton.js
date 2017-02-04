define(["InstanceCreator"], function(InstanceCreator) {
  // Private Scope
  var _Singleton,
      _self = null,
      _privVar = null;

  function _setPrivVar(val) {
    _privVar = val;
  }

  // Constructor
  _Singleton = function() {
    console.log(arguments);
  };

  _Singleton.prototype = {

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
    
  return {
    // Static Scope
    getInstance: function() {
      if (_self === null) {
        _self = InstanceCreator.createInstance(_Singleton, arguments);
      }
      return _self;
    }
  };
});