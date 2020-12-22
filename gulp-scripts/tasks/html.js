const gulp = require('gulp');

module.exports = () => gulp
    .src('./src/*.html')
    .pipe(gulp.dest('./public'));
