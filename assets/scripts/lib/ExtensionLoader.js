"use strict";
define(function() {
  var _config = {};
  
  /**
   * Get full type from variable
   * @param {*} variable
   * @return {string}
   * @private
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
      config.errback = (typeof config.callback === "function" ? config.errback : undefined);

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
   * @param {string} selector
   * @param {object} config
   * @param {boolean} [elementAlreadyFound]
   * @returns {boolean} true = success | false = element not found, load aborted
   * @private
   */
  function _loadIfElementExists(requireInstance, selector, config, elementAlreadyFound) {
    if (!!elementAlreadyFound === true || _checkElementExistence(selector)) {
      requireInstance(config.extensions, config.callback, config.errback);
      return true;
    }
    return false;
  }

  /**
   * Starts Parsing for ||, && and !
   * @param {string} selector
   * @returns {boolean}
   * @private
   */
  function _checkElementExistence(selector) {
    return _parseOr(selector);
  }

  /**
   * Parses OR in selector
   * @param {string} selector
   * @returns {boolean}
   * @private
   */
  function _parseOr(selector) {
    // Or aborts, when first true-value occurs
    var result = false,
      selectors = selector.split("||");

    for (var i in selectors) {
      result = _parseAnd(selectors[i]);
      if (result) {
        break;
      }
    }
    return result;
  }

  /**
   * Parses AND in selector
   * @param {string} selector
   * @returns {boolean}
   * @private
   */
  function _parseAnd(selector) {
    // And aborts, when first false-value occurs
    var result = true,
      selectors = selector.split("&&");

    for (var i in selectors) {
      result = _parseNot(selectors[i]);
      if (!result) {
        break;
      }
    }
    return result;
  }

  /**
   * Checks element existence or non-existence
   * @param {string} selector - valid CSS-Selector with or without ! before
   * @returns {boolean}
   * @private
   */
  function _parseNot(selector) {
    var negate = selector.indexOf("!") > -1;

    if (negate) {
      selector = selector.split("!").pop();
    }

    var element = !document.querySelector(selector);

    if (negate && element) {
      return element;
    }
    return !element;
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