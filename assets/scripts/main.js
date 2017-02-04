"use strict";
var requireBase = requirejs.config({
  "context": (new Date()).getTime(),
  "baseUrl": "assets/scripts",
  "paths": {
    "app": "app",
    "lib": "lib",
    "EventHelper": "lib/EventHelper",
    "ExtensionLoader": "lib/ExtensionLoader",
    "InstanceCreator": "lib/InstanceCreator",
    "appMain": "app/appMain",
    "config": "app/config",
    "extensions": "app/extensions",
    "exLib": "app/extensions/lib"
  }
});
requireBase(["appMain", "config"]);