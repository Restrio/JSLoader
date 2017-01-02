"use strict";
var requireBase = requirejs.config({
  "context": (new Date()).getTime(),
  "baseUrl": "assets/scripts",
  "paths": {
    "app": "app",
    "lib": "lib",
    "ExtensionLoader": "lib/extensionLoader",
    "appMain": "app/appMain",
    "config": "app/config",
    "extensions": "app/extensions",
    "exLib": "app/extensions/lib",
    "jquery": "lib/jquery"
  }
});
requireBase(["appMain", "config"]);