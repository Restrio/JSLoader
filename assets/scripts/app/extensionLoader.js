define(["jquery"], function (jQuery) {
  $j = jQuery.noConflict();

  $j(document).ready(function() {

    /*
     * SELECTOR : EXTENSION_PATH
     *
     * Selector:       The required element for loading the extension
     * Extension_Path: Path to the Javascript-Extension
     */
    var extensionDependencies = {
      "#moveable": {
        "extensions": ["extensions/mainDemo"],
        "callback": function() {
          console.log("Main loaded");
        }
      },
      ".notMain": {
        "extensions": [],
        "callback": function() {
          console.log("notMain loaded");
        }
      }
    };

    $j.each(extensionDependencies, function(selector, data) {
      loadExtensionIfElementExists(selector, data.extensions, data.callback);
    });

    // Loads Extension if specified selector gets at least 1 element
    function loadExtensionIfElementExists(selector, extension, callback) {
      if ($j(selector).length > 0) {
        requirejs(extension, callback);
      }
    }
  });
});