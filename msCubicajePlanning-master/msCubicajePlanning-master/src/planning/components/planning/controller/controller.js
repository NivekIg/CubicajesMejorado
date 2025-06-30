
module.exports = function (injectedStore) {
    let store = injectedStore;

    if (!store) {
        store = require('../../../../store/dummy');
    };

    async function list() {
        return await store.list();
    };

    async function insert(data) {
        return store.insert(data);
    }

    async function itemsByPlanning(id) {
        return store.itemsByPlanning(id);
    }

    async function update(data) {
        return store.update(data);
    }

    return {
        list,
        insert,
        itemsByPlanning,
        update
    };
}