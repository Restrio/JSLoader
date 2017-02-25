/**
 * Created by PC on 25.02.2017.
 */
const Gulp = require("gulp");
Gulp.minify = require("gulp-minify");
Gulp.uglify = require("gulp-uglify");
Gulp.sass = require("gulp-sass");
Gulp.minifyCSS = require("gulp-minify-css");
Gulp.debug = require("gulp-debug");

var Paths = {
  src: "./source/",
  dest: "./assets/",
  tmp: "./tmp/"
};

Gulp.task("scripts", function() {
  "use strict";
  Gulp.src([Paths.src + "scripts/**/*.js", "!" + Paths.src + "scripts/**/_*.js"])
    .pipe(Gulp.uglify())
    .pipe(Gulp.minify({
      ext: {
        src: ".js",
        min: ".js"
      },
      noSource: true
    }))
    .pipe(Gulp.dest(Paths.dest + "scripts"))
});

Gulp.task("styles", function() {
  "use strict";
  Gulp.src(Paths.src + "css/**/*.scss")
    .pipe(Gulp.sass())
    .pipe(Gulp.minifyCSS())
    .pipe(Gulp.dest(Paths.dest + "css"));
});