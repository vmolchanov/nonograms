const {server, productionConfig: config} = require('../components/server');

module.exports = () => {
    server.init(config);
};
