const store = require('../../stores/mysql');

const ctrl = require('./controller');

module.exports = ctrl(store);