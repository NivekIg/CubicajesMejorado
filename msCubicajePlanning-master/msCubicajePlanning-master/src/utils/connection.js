const mysql = require('mysql');
const config = require('../../config');

let pool = mysql.createPool({});
pool.config.connectionConfig.host = config.mysql.host;
pool.config.connectionConfig.user = config.mysql.user;
pool.config.connectionConfig.password = config.mysql.password;
pool.config.connectionConfig.database = config.mysql.database;
pool.config.connectionLimit = 10000;

module.exports = pool;