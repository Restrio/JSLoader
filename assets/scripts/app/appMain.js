"use strict";
define(["jquery"], function(jQuery) {
  var $j = jQuery.noConflict();

  $j(document).ready(function() {

    // __ DEMO __
    var contentType = $j("meta[name='type']").attr("type");
    $j("#headline").addClass(contentType).html(contentType);
    // __ DEMO __

  });
});