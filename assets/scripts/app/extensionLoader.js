define(["jquery"], function (jQuery) {
  var $j = jQuery.noConflict();

  $j(document).ready(function() {

    /*
     * SELECTOR : EXTENSION_PATH
     *
     * Selector:       The required element for loading the extension
     * Extensions:     Path to the Javascript-Extension
     * Callback:       Callback will be executed after successful extension load
     */
    var extensionDependencies = {
      "#moveable": {
        "extensions": ["extensions/mainDemo"],
        "callback": function(jQuery, mainDemo) {
          console.log(arguments)
        }
      },
      "#myShit": [{
        "extensions": [],
        "callback": function() {
          console.log("notMain loaded");
        }
      }, {
        "extensions": [],
        "callback": function() {
          console.log("notMain loaded");
        }
      }]
    };

    $j.each(extensionDependencies, parseDependencies);

    /**
     *
     * @param {string} selector - selector of markup-dependency
     * @param {object|...object} data - contains (array of) following properties
     * @param {...string} [data.extensions] - contains extensions to be loaded
     * @param {function}  [data.callback] - contains callback-function
     * @param {boolean} allowAbort
     * @returns {boolean} - if markup-element has been found
     */
    function parseDependencies(selector, data, allowAbort) {
      allowAbort = !!allowAbort;

      // If Extension contains multiple extensions-configurations
      if (Object.prototype.toString.call(data) === "[object Array]") {

        // Load every single configuration-block by itself
        $j.each(data, function(index, value) {
          return parseDependencies(selector, value, true);
        });

      } else {
        return loadExtensionIfElementExists(selector, data.extensions, data.callback, allowAbort);
      }
    }

    /**
     * Loads Extension if specified selector gets at least 1 element
     * @param selector - selector of markup-dependency
     * @param extensions - extensions to be loaded
     * @param callback - callback to be executed after successful load
     * @param allowAbort - if script is allowed to tell if element exists
     * @returns {boolean} - true (default) | false (markup-element does not exist)
     */
    function loadExtensionIfElementExists(selector, extensions, callback, allowAbort) {
      callback = (typeof callback === "function" ? callback : undefined);
      if ($j(selector).length >= selector.split(",").length) {
        requirejs(extensions, callback);
        return true;
      }
      return !allowAbort;
    }
  });
});
