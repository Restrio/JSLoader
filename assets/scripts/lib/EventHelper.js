define(function() {
  return {
    windowLoad: function(callback) {
      if (document.readyState !== "complete") {
        window.addEventListener("load", function() {
          callback()
        });
      } else {
        callback();
      }
    }
  };
});