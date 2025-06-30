const pool = require('../utils/connection');

function list(table) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (!err) {
                const sql = `SELECT * FROM ${table}`;
                conn.query(sql, function (err, rows) {
                    return !err ? resolve(rows) : reject(err)
                })
                conn.release();
            } else {
                return reject(err);
            }
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (!err) {
                const sql = `SELECT * FROM ${table} WHERE id = ?`;
                conn.query(sql, [id], function (err, rows) {
                    return !err ? resolve(rows[0]) : reject(err)
                })
                conn.release();
            } else {
                return reject(err);
            }
        })
    })
}

function insert(table, body) {
    const { data, params } = body;
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (!err) {
                const sql = `INSERT INTO ${table}(${params}) VALUES(?)`;
                conn.query(sql, [Object.values(data)], function (err, rows) {
                    return !err ? resolve(rows) : reject(err)
                })
                conn.release();
            } else {
                return reject(err);
            }
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (!err) {
                const sql = `UPDATE ${table} SET ? WHERE id = ?`;
                conn.query(sql, [data, data.id], function (err, rows) {
                    return !err ? resolve(rows) : reject(err)
                })
                conn.release();
            } else {
                return reject(err);
            }
        })
    })
}

function remove(table, id) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (!err) {
                const sql = `DELETE FROM ${table} WHERE id = ?`;
                conn.query(sql, [id], function (err, rows) {
                    return !err ? resolve(rows) : reject(err)
                })
                conn.release();
            } else {
                return reject(err);
            }
        })
    })
}

module.exports = {
    list,
    get,
    insert,
    update,
    remove,
}