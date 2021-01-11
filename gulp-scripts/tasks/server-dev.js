const gulp = require('gulp');
const {server, developmentConfig: config, reload} = require('../components/server');
const html = require('./html');
const styles = require('./styles');
const scripts = require('./scripts');
const images = require('./images');

module.exports = () => {
    server.init(config);

    gulp.watch('./src/**/*.jade').on('change', gulp.series(html, reload));
    gulp.watch('./src/scss/**/*.scss').on('change', gulp.series(styles, reload));
    gulp.watch('./src/js/**/*.js').on('change', gulp.series(scripts, reload));
    gulp.watch('./src/img/**/*.*').on('change', gulp.series(images, reload));
};
