import Config from 'react-native-config';
import reqHelper from '../helpers/reqHelper';

const getPlannings = async () => await reqHelper(`${Config.PLANNING_URL}/api/plannings`, 'get');

const insertPlanning = async (data) => await reqHelper(`${Config.PLANNING_URL}/api/plannings`, 'post', data);

const getItemsByPlanning = async (id) => await reqHelper(`${Config.PLANNING_URL}/api/plannings/items/${id}`, 'get');

const updatePlanning = async (data) => await reqHelper(`${Config.PLANNING_URL}/api/plannings`, 'patch', data);

const getItems = async () => await reqHelper(`${Config.API_URL}/api/items`, 'get');

const insertItem = async (data) => await reqHelper(`${Config.API_URL}/api/items`, 'post', data);

const updateItem = async (data) => await reqHelper(`${Config.API_URL}/api/items`, 'put', data);

const getSpaces = async () => await reqHelper(`${Config.API_URL}/api/spaces`, 'get');

const insertSpace = async (data) => await reqHelper(`${Config.API_URL}/api/spaces`, 'post', data);

const updateSpace = async (data) => await reqHelper(`${Config.API_URL}/api/spaces`, 'put', data);

const getTypes = async () => await reqHelper(`${Config.API_URL}/api/types`, 'get');

export {
    getPlannings,
    insertPlanning,
    getItemsByPlanning,
    updatePlanning,
    getItems,
    insertItem,
    updateItem,
    getSpaces,
    insertSpace,
    updateSpace,
    getTypes,
}