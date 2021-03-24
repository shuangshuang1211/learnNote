"use strict";

// Load plugins
const del = require("del");
const gulp = require("gulp");
const jshint = require('gulp-jshint');
const notify = require('gulp-notify');
const uglify = require("gulp-terser");
const reversion = require('gulp-rev-append');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
// const pngcrush = require('imagemin-pngcrush');
const cssMin = require('gulp-css');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');

// Clean file
function cleanMiniFile() {
  return del(["./dist/*", "!**.tar.gz"]);
}

// check js
function checkJs() {
  return gulp.src('./static/**/*.js')
    .pipe(jshint())
    .pipe(notify({message: 'check js task ok'}));
}
//Compress JS code
function compressJs() {
  return gulp.src('./static/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/static/js'))
    .pipe(notify({message: 'compress js task ok'}));
}

// Compress HTML
const htmlOptions = {
  removeComments: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyJS: true,
  minifyCSS: true
};
function compressViewHtml() {
  return gulp.src('./view/**/*.html')
    .pipe(reversion())
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest('./dist/view'))
    .pipe(notify({message: 'compress html task ok'}));
}

function compressIndexHtml() {
  return gulp.src('./index.html')
    .pipe(reversion())
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest('./dist'))
    .pipe(notify({message: 'compress index html task ok'}));
}

// Compress css
function compressCss() {
  return gulp.src(['./static/css/**/*.css'])
    .pipe(cssMin())
    .pipe(gulp.dest('dist/static/css'))
    .pipe(notify({message: 'compress css task ok'}));
}

// compress image
function compressImg() {
  return gulp.src('./static/image/*')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest('dist/static/image'))
    .pipe(notify({message: 'compress img task ok'}));
}

function tarFile() {
  return gulp.src('./dist/**')
    .pipe(tar('build.tar'))
    .pipe(gzip({append: true}))
    .pipe(gulp.dest('./dist'));
}

exports.compressImg = compressImg;
exports.compressCss = compressCss;
exports.compressHtml = gulp.series(compressViewHtml, compressIndexHtml);
exports.compressJs = compressJs;
exports.checkJs = checkJs;
exports.cleanMiniFile = cleanMiniFile;
exports.tarFile = tarFile;