const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const webpack = require('../components/webpack');

module.exports = () => gulp
    .src('./src/js/**/*.js')
    .pipe(webpack())
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('./public/js'));
