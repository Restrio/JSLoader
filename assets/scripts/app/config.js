define(["ExtensionLoader"], function(ExtensionLoader) {
  var loader = ExtensionLoader(),
      moveableConf = {
        extensions: ["extensions/mainDemo"],
        callback: function (mainDemo) {
          console.log(arguments)
        }
      };

  loader.addConfig({
    "#moveable": moveableConf,
    "#myShit": [{
      extensions: [],
      callback: function() {
        console.log("notMain loaded");
      }
    }, {
      extensions: [],
      callback: function() {
        console.log("notMain loaded");
      }
    }]
  }).addConfig({
    "#myShit": {
      extensions: []
    }
  }).load();
});