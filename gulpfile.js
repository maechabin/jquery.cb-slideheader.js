"use strict";

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var header = require("gulp-header");

var pkg = require("./package.json");
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join("\n");

console.log(banner);

gulp.task("uglify", function () {
  gulp.src("./src/*.js")
    .pipe(gulp.dest("./dist"))
    .pipe(concat("jquery.cb-slideheader.min.js"))
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest("./dist"))
});

gulp.task("default", ["uglify"]);
