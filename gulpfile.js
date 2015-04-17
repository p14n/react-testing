var gulp = require("gulp");
var mocha = require("gulp-mocha");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
require('babel-core/register');

gulp.task("dev:test", function() {
  return gulp.src("tests/*.js", {read: false})
    .pipe(mocha({
      reporter: "nyan",
      compilers: "js:babel-core/register"
    }));
});

gulp.task("dev:watch", function() {
  return gulp.watch(["tests/*.js", "src/*.js"], ["dev:test"]);
});

gulp.task("bundle:browser", function() {
  return browserify({
  })
    .require("./src/csp.js", {expose: "csp"})
    .bundle()
    .pipe(source("csp.bundled.browser.js"))
    .pipe(gulp.dest("./build/"));
});

gulp.task("bundle:node", function() {
  return browserify({
    standalone: "csp"
  })
    .require("./src/csp.js", {expose: "csp"})
    .bundle()
    .pipe(source("csp.bundled.node.js"))
    .pipe(gulp.dest("./build/"));
});

gulp.task("bundle", ["bundle:node", "bundle:browser"]);

// TODO: Test bundles
gulp.task("test", function() {
  return gulp.src("tests/*.js", {read: false})
    .pipe(mocha({
      reporter: "spec",
      compilers: "js:babel-core/register"
    }));
});

