const pool = require('../utils/connection');

function list() {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (!err) {
                const sql = `SELECT
                    a.id,
                    a.created_at,
                    a.volume,
                    a.entry_date,
                    a.output_date,
                    b.name,
                    b.ciudad,
                    b.volume AS spaceVolume,
                    (SELECT SUM(quantity) FROM plannings_has_items WHERE plannings_id = a.id) as items
                    FROM plannings AS a
                    JOIN spaces AS b
                    ON a.spaces_id = b.id
                    ORDER BY created_at DESC`;
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

function insert(body) {
    const { volume, spaces_id, items } = body;
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (!err) {
                const sql = `INSERT INTO plannings(volume, spaces_id) VALUES(?, ?)`;
                conn.query(sql, [volume, spaces_id], function (err, rows) {
                    if (!err) {
                        const plannings_id = rows.insertId;
                        const sqlItems = `INSERT INTO plannings_has_items(plannings_id, items_id, quantity, cols, rowspan, stacks) VALUES ?`;
                        const updatedItems = items.map((item) => {
                            return {
                                plannings_id,
                                ...item
                            }
                        })
                        const data = updatedItems.map((el) => Object.values(el));
                        conn.query(sqlItems, [data], function (err, rows) {
                            if (!err) {
                                const sql = `SELECT
                                    a.id,
                                    a.created_at,
                                    a.volume,
                                    a.entry_date,
                                    a.output_date,
                                    b.name,
                                    b.ciudad,
                                    b.volume AS spaceVolume,
                                    (SELECT SUM(quantity) FROM plannings_has_items WHERE plannings_id = a.id) as items
                                    FROM plannings AS a
                                    JOIN spaces AS b
                                    ON a.spaces_id = b.id WHERE a.id = ?`;
                                conn.query(sql, [plannings_id], function (err, rows) {
                                    return !err ? resolve(rows[0]) : reject(err)
                                })
                            } else {
                                reject(err)
                            }
                        })
                        conn.release();
                    } else {
                        return reject(err);
                    }
                })
            } else {
                conn.release();
                return reject(err);
            }
        })
    })
}

function itemsByPlanning(id) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (!err) {
                const sqlItems = `SELECT a.quantity, a.cols, a.rowspan, a.stacks, b.name FROM plannings_has_items AS a JOIN items AS b ON a.items_id = b.id WHERE a.plannings_id = ?`;
                conn.query(sqlItems, [id], function (err, rows) {
                    if (!err) {
                        return !err ? resolve(rows) : reject(err);
                    }
                })
                conn.release();
            } else {
                return reject(err);
            }
        })
    })
}

function update(data) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (!err) {
                const sql = `UPDATE plannings SET ? WHERE id = ?`;
                conn.query(sql, [data, data.id], function (err, rows) {
                    console.log('data', data);
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
    insert,
    itemsByPlanning,
    update
}