"use strict";

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var header = require("gulp-header");
var qunit = require("gulp-qunit");

var pkg = require("./package.json");
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join("\n");

gulp.task("js", function () {
  gulp.src("./src/*.js")
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest("./dist"))
    .pipe(concat("jquery.cbslideheader.min.js"))
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest("./dist"))
});

gulp.task("css", function () {
  gulp.src("./src/*.css")
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest("./dist"))
});

gulp.task('test', function() {
    gulp.src('./test/index.html')
      .pipe(qunit());
});

gulp.task("default", ["js", "css"]);
