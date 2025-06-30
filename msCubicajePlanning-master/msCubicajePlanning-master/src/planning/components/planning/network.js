const express = require('express');
const ctrl = require('./controller');
const response = require('../../../utils/response');

const router = express.Router();

router.get('/', function (req, res) {
    ctrl.list()
        .then((data) => response.success(req, res, 200, data))
        .catch((err) => response.error(req, res, 500, err))
})

router.post('/', function (req, res) {
    ctrl.insert(req.body)
        .then((data) => response.success(req, res, 200, data))
        .catch((err) => response.error(req, res, 500, err))
})

router.get('/items/:id', function (req, res) {
    ctrl.itemsByPlanning(req.params.id)
        .then((data) => response.success(req, res, 200, data))
        .catch((err) => response.error(req, res, 500, err))
})

router.patch('/', function (req, res) {
    ctrl.update(req.body)
        .then((data) => response.success(req, res, 200, data))
        .catch((err) => response.error(req, res, 500, err))
})

module.exports = router;