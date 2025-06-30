const express = require('express');
const ctrl = require('./controller');
const response = require('../network/response');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', update);
router.delete('/:table/:id', remove);

async function list(req, res) {
    ctrl.list(req.params.table)
        .then(data => response.success(req, res, 200, data))
        .catch(err => response.error(req, res, 500, err))
}

async function get(req, res) {
    ctrl.get(req.params.table, req.params.id)
        .then(data => response.success(req, res, 200, data))
        .catch(err => response.error(req, res, 500, err))
}

async function insert(req, res) {
    ctrl.insert(req.params.table, req.body)
        .then(data => response.success(req, res, 200, data))
        .catch(err => response.error(req, res, 500, err))
}

async function update(req, res) {
    ctrl.update(req.params.table, req.body)
        .then(data => response.success(req, res, 200, data))
        .catch(err => response.error(req, res, 500, err))
}

async function remove(req, res) {
    ctrl.remove(req.params.table, req.params.id)
        .then(data => response.success(req, res, 200, data))
        .catch(err => response.error(req, res, 500, err))
}

module.exports = router;