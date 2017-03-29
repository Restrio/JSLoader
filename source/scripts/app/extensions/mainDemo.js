define(["extensions/lib/DemoModule"], function(DemoModule) {
  // Initialize Box
  var Box = new DemoModule("#moveable");

  // Change Colors
  Box.setColorInterval([
    "blue",
    "yellow",
    "green",
    "rgba(123, 0, 77, 0.3)",
    "#34D7AE"
  ], 250);

  setTimeout(function() {
    "use strict";
    Box.clearInterval();
  }, 5000);
});