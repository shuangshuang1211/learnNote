"use strict";

// Load plugins
const del = require("del");
const gulp = require("gulp");
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const fs = require('fs');

// Clean html
function cleanHtml() {
  return del(["./view/"]);
}

// Create html from nunjucks
function createHtml() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('./app/pages/*.+(html|njk)')
    // Adding data to Nunjucks
    .pipe(data(function() {
      const dataJson = JSON.parse(fs.readFileSync('./app/data.json'));
      return dataJson;
    }))
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['./app/templates']
      }))
    // output files in app folder
    .pipe(gulp.dest('./view'));
}

exports.cleanHtml = cleanHtml;
exports.createHtml = createHtml;