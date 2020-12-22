const browserSync = require('browser-sync').create();
const {reload} = browserSync;
const developmentConfig = {
    server: './public',
    tunnel: 'nonograms',
    open: false
};
const productionConfig = {
    server: {
        baseDir: './public'
    },
    open: false
};

module.exports = {
    server: browserSync,
    reload,
    developmentConfig,
    productionConfig
};
