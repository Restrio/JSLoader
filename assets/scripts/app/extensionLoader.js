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
      ".Main": {
        "extensions": [],
        "callback": function() {

        }
      },
      ".notMain": {
        "extensions": [],
        "callback": function() {

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