<?php
  $isDev = strpos($_SERVER["HTTP_HOST"], "localhost") !== false && !($_GET["dev"] === "live");
  $jsRoot = $isDev ? "source" : "assets";
?>
<!DOCTYPE html>
<html>
  <head>
    <title>JS Pattern</title>
    <meta name="type" type="Main" />
    <script src="<?php echo $jsRoot ?>/scripts/lib/require.js" data-main="<?php echo $jsRoot ?>/scripts/main.js" type="text/javascript"></script>
    <?php if ($isDev): ?>
      <script>window.isDev = true;</script>
    <?php endif; ?>
  </head>
  <body>
    <div id="headline"></div>
    <a href="notIndex.html">change Page</a>
    <div id="moveable" class="moveable"></div>
    <div class="moveable"></div>
  </body>
</html>