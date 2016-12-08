define(["ExtensionLoader"], function(ExtensionLoader) {
  var loader = ExtensionLoader(),
      moveableConf = {
        extensions: ["extensions/mainDemo"],
        callback: function (mainDemo) {
          console.log(arguments)
        }
      };

  loader.addConfig({
    // External Configured Object
    "#moveable": moveableConf,
    
    // Multiple Callbacks, Extensions optional if code is very small
    "#otherElement": [{
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
    
    // Extends Config from above, callback optional
    "#otherElement": {
      extensions: ["extensions/mainDemo"]
    }
    
    // Load your Configuration whenever you want
  }).load();
  
  // Bonus: The Extensionloader is instanciable, so you can load another codeblock whenever you need it in you app
});