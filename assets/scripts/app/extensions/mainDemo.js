define(["jquery", "extensions/lib/DemoModule"], function(jQuery, DemoModule) {
  var $j = jQuery.noConflict();

  $j(document).ready(function() {
    var Box = new DemoModule("#moveable");
    Box.moveH(20)
      .moveV(100)
      .moveH(-30)
      .moveV(110)
      .moveH(10)
      .moveV(-210);
  });
});