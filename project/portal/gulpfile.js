"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const merge = require("merge-stream");
const {createHtml, cleanHtml} = require("./gulp/createHtml");
const {compressImg, compressCss, compressHtml, checkJs, compressJs, cleanMiniFile, tarFile} = require("./gulp/miniFile");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function cleanVendor() {
  return del(["./vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('./vendor/bootstrap'));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'));
  return merge(bootstrap, jquery);
}

// Watch files
function watchFiles() {
  gulp.watch("./**/*.css", browserSyncReload);
  gulp.watch("./**/*.html", browserSyncReload);
  gulp.watch("./app/**/*.njk", createHtml);
}

// Define complex tasks
const vendor = gulp.series(cleanVendor, modules);
const createHtmlTask = gulp.series(cleanHtml, createHtml);
const minifyFile = gulp.series(createHtmlTask, cleanMiniFile, gulp.parallel(compressImg, compressCss, compressHtml, gulp.series(checkJs, compressJs)));
const watch = gulp.series(vendor, minifyFile, createHtml, gulp.parallel(watchFiles, browserSync));
const build = gulp.series(minifyFile, tarFile, cleanMiniFile);

// Export tasks
exports.cleanVendor = cleanVendor;
exports.vendor = vendor;
exports.watch = watch;
exports.build = build;
exports.default = build;
exports.createHtmlTask = createHtmlTask;
exports.minifyFile = minifyFile;
exports.cleanMiniFile = cleanMiniFile;