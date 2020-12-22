const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');

module.exports = () => gulp
    .src('./src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('./public/css'));
