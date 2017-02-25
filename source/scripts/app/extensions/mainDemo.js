define(["extensions/lib/DemoModule"], function(DemoModule) {
  // Initialize Box
  var Box = new DemoModule("#moveable");

  // Move it
  Box.moveH(20, 50)
    .moveV(100, 700)
    .moveH(-30)
    .moveV(110, 1000)
    .wait(500)
    .moveH(10, 50)
    .moveV(-210, 50);
});