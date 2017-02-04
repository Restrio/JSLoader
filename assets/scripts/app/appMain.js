"use strict";
define(["EventHelper"], function(EventHelper) {

  EventHelper.windowLoad(function() {
    var contentType = document.querySelector("meta[name='type']").attr("type"),
        headline = document.getElementById("#headline");

    headline.classList.add(contentType);
    headline.innerHTML = contentType;
  });
});