"use strict";
requirejs.config({
  "baseUrl": "assets/scripts",
  "paths": {
    "app": "app",
    "lib": "lib",
    "ExtensionLoader": "lib/extensionLoader",
    "appMain": "app/appMain",
    "configuration": "app/configuration",
    "extensions": "app/extensions",
    "exLib": "app/extensions/lib",
    "jquery": "lib/jquery"
  },
  "map": {
    "*": { "jquery": "jquery" }
  },
  "shim": {
    "appMain": ["jquery"]
  }
});
requirejs(["configuration", "appMain"]);