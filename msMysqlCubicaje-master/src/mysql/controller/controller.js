module.exports = function (injectedStore) {

    let store = injectedStore;

    if (!store) {
        store = require('../../store/dummy');
    };

    async function list(table) {
        return await store.list(table);
    }

    async function get(table, id) {
        return await store.get(table, id);
    }

    async function insert(table, data) {
        return await store.insert(table, data);
    }

    async function update(table, data) {
        return await store.update(table, data);
    }

    async function remove(table, id) {
        return await store.remove(table, id);
    }

    return {
        list,
        get,
        insert,
        update,
        remove
    }
}