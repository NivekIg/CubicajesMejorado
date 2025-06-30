const express = require('express');
const bodyParser = require('body-parser');

const config = require('../../config');
const router = require('./network');

const app = express();

app.use(bodyParser.json());

app.use('/', router);

app.listen(config.mysqlService.port, function () {
    console.log('Mysql service online in port ', config.mysqlService.port);
})