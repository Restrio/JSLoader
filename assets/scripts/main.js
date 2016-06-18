"use strict";
requirejs.config({
  "baseUrl": "assets/scripts",
  "paths": {
    "app": "app",
    "lib": "lib",
    "appMain": "app/appMain",
    "extensionLoader": "app/extensionLoader",
    "extensions": "app/extensions",
    "jquery": "lib/jquery"
  },
  "map": {
    "*": { "jquery": "jquery" }
  },
  "shim": {
    //dependecies here
    "appMain": ["jquery"],
    "extensionLoader": ["jquery"]
  }
});
requirejs(["appMain"]);
requirejs(["extensionLoader"]);
