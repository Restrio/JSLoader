"use strict";
requirejs.config({
  "baseUrl": "assets/scripts",
  "paths": {
    "app": "app",
    "lib": "lib",
    "tim": "app/tim",
    "jquery": "lib/jquery",
    "jspattern": "app/jspattern",
    "extensionLoader": "app/extensionLoader"
  },
  "map": {
    "*": { "jquery": "jquery" }
  },
  "shim": {
    //dependecies here
    "jspattern": ["jquery"],
    "extensionLoader": ["jquery"]
  }
});
requirejs(["jspattern"]);
requirejs(["extensionLoader"]);
