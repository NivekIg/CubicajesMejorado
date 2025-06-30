const db = {
    spaces: [
        {
            id: 1,
            name: 'Bodega General',
        }
    ]
};

async function list(table) {
    return db[table] || []
};

async function insert(table, data) {
    db[table].push(data);
};

async function update(table, data) {
    let rows = await list(table);
    db[table] = rows.map((item) => {
        if(item.id === data.id) {
            return {
                ...item,
                ...data
            }
        }
        return item;
    })
};

async function remove(table, id) {
    const rows = await list(table);
    db[table] = rows.filter(item => item.id !== parseInt(id));
}

module.exports = {
    list,
    insert,
    update,
    remove
}