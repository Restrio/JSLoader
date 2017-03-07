define(function() {
  "use strict";
  
  var _JS = {
    getType: function(variable) {
      return Object.prototype.toString.call(variable);
    },
    Eventer: {
      windowLoad: function(callback) {
        if (typeof callback === "function") {
          if (document.readyState !== "complete") {
            window.addEventListener("load", callback);
          } else {
            return callback();
          }
        } else {
          return false;
        }
      }
    },
    Creater: {
      createInstance: function(obj, arg) {
        
        // Create array out of arguments
        if (_JS.getType(arg) === "[object Arguments]") {
          arg = Array.prototype.slice.call(arg);
        }
        // add empty value at position 0 to make sure all parameters pass correctly
        arg.splice(0, 0, undefined);
        // This adds all parameters from getInstance to the constructor
        return new (obj.bind.apply(obj, arg))();
      }
    },
    Loader: function() {
      return new (function() {
        var _config = {},
            _cssLoaded = [],
            _head = undefined;

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
          var configType = _JS.getType(config);

          if (configType === "[object Array]") {
            for (var index in config) {
              _parseConfigNode(selector, config[index]);
            }
          } else if (configType === "[object Object]" && config.hasOwnProperty("extensions")) {
            // Validate Callback
            config.callback = (typeof config.callback === "function" ? config.callback : undefined);
            config.errback = (typeof config.callback === "function" ? config.errback : undefined);

            config.styles = _getParsedCssConfigArray(config.styles);

            _addConfigToSelector(selector, config);
          } else {
            console.error("Invalid Configuration given for " + selector + "!", config);
          }
        }

        /**
         *
         * @param styleConfigs
         * @returns {*}
         * @private
         */
        function _getParsedCssConfigArray(styleConfigs) {
          if (styleConfigs == undefined) {
            return [];
          }
          var type = _JS.getType(styleConfigs);

          if (type === "[object String]") {
            return [{href: type}];
          } else if (type === "[object Array]") {
            var configArray = [];
            for (var i in styleConfigs) {
              var styleConfig = _getParsedCssConfig(styleConfigs[i]);
              styleConfig = _setCssDefaultValues(styleConfig);

              if (styleConfig !== undefined) {
                configArray.push(styleConfig);
              }
            }
            return configArray;
          }
        }

        /**
         *
         * @param styleConfig
         * @returns {undefined|{}}
         * @private
         */
        function _getParsedCssConfig(styleConfig) {
          if (typeof styleConfig !== "string" && styleConfig.href === undefined) {
            return undefined;
          }
          // If array of strings is configured, parse it

          if (typeof styleConfig == "string") {
            return _getParsedCssConfig({href: styleConfig});
          }

          // If href is a string
          if (typeof styleConfig.href === "string") {
            // Get Position of Fileending
            var fileEndingIndex = styleConfig.href.indexOf(".css");

            // If Fileending exists, everythings fine

            if (fileEndingIndex === styleConfig.href.length - 4) {
              return styleConfig;
              // If Fileending missing, add .css

            } else if (fileEndingIndex == -1) {
              styleConfig.href += ".css";
              return styleConfig;
            }
            // If nothing happened before, its clearly broken and should not be executed
            return undefined;
          }
          return undefined;
        }

        function _setCssDefaultValues(config) {
          if (typeof config !== "object" || config.href === undefined) {
            return undefined;
          }
          config.rel = config.rel ? config.rel : "stylesheet";
          config.media = config.media ? config.media : "all";
          config.type = config.type ? config.type : "text/css";
          return config;
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
          if (_JS.getType(requireInstance) !== "[object Object]") {
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
          if (!!elementAlreadyFound || _checkElementExistence(selector)) {
            requireInstance(config.extensions, config.callback, config.errback);
            _loadCSS(config.styles);
            return true;
          }
          return false;
        }

        function _loadCSS(cssConfigs) {
          if (cssConfigs.length > 0 && _head === undefined) {
            _head = document.querySelector("head")
          }
          for (var i in cssConfigs) {
            var cssConfig = cssConfigs[i];

            if (_cssLoaded.indexOf(cssConfig.src) === -1) {
              var link = document.createElement("link");
              for (var attribute in cssConfig) {
                var value = cssConfig[attribute];
                link.setAttribute(attribute, value);
              }
              _head.append(link);
              _cssLoaded.push(cssConfig.src);
            }
          }
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
          var result,
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
          var result,
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

        var Loader = function() {};

        Loader.prototype = {
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
            _JS.Eventer.windowLoad(function() {
              _loadAll(requireInstance);
            });
          }
        };

        return new Loader();
      })();
    }
  };

  return {
    getLoader: function() {
      return _JS.Loader();
    },
    getEventer: function() {
      return _JS.Eventer;
    },
    getCreater: function() {
      return _JS.Creater;
    }
  };
});