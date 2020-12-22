const gulp = require('gulp');
const html = require('./gulp-scripts/tasks/html');
const styles = require('./gulp-scripts/tasks/styles');
const scripts = require('./gulp-scripts/tasks/scripts');
const images = require('./gulp-scripts/tasks/images');
const developmentServer = require('./gulp-scripts/tasks/server-dev');
const productionServer = require('./gulp-scripts/tasks/server-prod');
const clean = require('./gulp-scripts/tasks/clean');

gulp.task('server-dev', developmentServer);

gulp.task('server-prod', productionServer);

gulp.task('clean', clean);

gulp.task('build', gulp.parallel(images, html, styles, scripts));
