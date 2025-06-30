const express = require('express');

const config = require('../../config.js');

const planning = require('./components/planning/network');

const bodyParser = require('body-parser');

const app = express();

//Middleware
app.use(bodyParser.json());

//Routing
app.use('/api/plannings', planning);

app.listen(config.planning.port, () => {
  console.log('Api escuchando en el puerto ', config.planning.port)
})