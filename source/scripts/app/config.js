define(["JS"], function(JS) {
  var loader = JS.getLoader();

  loader.addConfig({
    // External Configured Object
    "#moveable": {
      extensions: ["extensions/mainDemo"],
      callback: function (mainDemo) {
        console.log(arguments)
      }
    },
    
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
      extensions: [],
      callback: function() {
        console.log("This extends the given config");
      }
    }
    
    // Load your Configuration whenever you want
  }).load();
  
  // Bonus: The Extensionloader is instanciable, so you can load another codeblock whenever you need it in you app
});