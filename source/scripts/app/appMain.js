"use strict";
define(["JS"], function(JS) {

  JS.getEventer().windowLoad(function() {
    var contentType = document.querySelector("meta[name='type']").getAttribute("type"),
        headline = document.getElementById("headline");

    headline.className += contentType;
    headline.innerHTML = contentType;
  });
});