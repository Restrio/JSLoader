define(function() {
  var _config = {};
  
  /**
   * Get full type from variable
   * @param {*} variable
   * @return {string}
   @private
   */
  function _getType(variable) {
    return Object.prototype.toString.call(variable);
  }

  /**
   * Splits Selectors from Configurations
   * @param {object} config
   * @private
   */
  function _parseConfig(config) {
    for (var selector in config) {
      _parseConfigNode(selector, config[selector]);
    }
  }

  /**
   * Validate Configuration and Call Config Save
   * @param {string} selector
   * @param {object} config
   * @private
   */
  function _parseConfigNode(selector, config) {
    var configType = _getType(config);

    if (configType === "[object Array]") {
      for (var index in config) {
        _parseConfigNode(selector, config[index]);
      }
    } else if (configType === "[object Object]" && config.hasOwnProperty("extensions")) {
      // Validate Callback
      config.callback = (typeof config.callback === "function" ? config.callback : undefined);

      _addConfigToSelector(selector, config);
    } else {
      console.error("Invalid Configuration given for " + selector + "!", config);
    }
  }

  /**
   * Saves Configuration in Config-Array for Selector
   * @param {string} selector
   * @param {object} config
   * @private
   */
  function _addConfigToSelector(selector, config) {
    if (!_config.hasOwnProperty(selector)) {
      _config[selector] = [];
    }
    _config[selector].push(config);
  }

  /**
   * Calls load for all Selectors
   * @private
   */
  function _loadAll(requireInstance) {
    if (_getType(requireInstance) !== "[object Object]") {
      requireInstance = requireBase;
    }
    for (var index in _config) {
      _load(requireInstance, index, _config[index]);
    }
  }

  /**
   * Call loading of extensions for each configuration in selector
   * @param {function} requireInstance - Instance of requireJS
   * @param {string} selector
   * @param {...object} configArray
   * @private
   */
  function _load(requireInstance, selector, configArray) {
    var result = false;
    for (var index in configArray) {
      result = _loadIfElementExists(requireInstance, selector, configArray[index], result);
      if (!result) {
        break;
      }
    }
  }

  /**
   * Uses RequireJs to load Extensions if element exists
   * @param {function} requireInstance - Instance of requireJS
   * @param {string} element
   * @param {object} config
   * @param {boolean} [elementAlreadyFound]
   * @returns {boolean} true = success | false = element not found, load aborted
   * @private
   */
  function _loadIfElementExists(requireInstance, element, config, elementAlreadyFound) {
    if (!!elementAlreadyFound === true || document.querySelectorAll(element).length >= element.split(",").length) {
      requireInstance(config.extensions, config.callback);
      return true;
    }
    return false;
  }

  var ExtensionLoader = function() {};

  ExtensionLoader.prototype = {
    getConfig: function() {
      return _config;
    },
    /**
     * Parses and saved Configuration for later loading
     * @param {object} config
     * @returns {object}
     */
    addConfig: function(config) {
      _parseConfig(config);
      return this;
    },

    /**
     * Loads all Extensions when Dom is loaded
     * @param {object} [requireInstance] - Instance of requireJS
     * @see _loadAll
     */
    load: function(requireInstance) {
      if (document.readyState !== "complete") {
        window.addEventListener("load", function() {
          _loadAll(requireInstance);
        });
      } else {
        _loadAll(requireInstance);
      }
    }
  };

  return ExtensionLoader;
});