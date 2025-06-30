const axios = require('axios');

const axiosInstance = axios.create();

async function reqHelper(url, method, body) {
    try {
        const { data } = await axiosInstance({
            url,
            method: method,
            data: body
        })
        console.log('====reqHelper, data', data);
        return data;
    } catch (error) {
        console.log('====reqHelper error', error);
        return error;
    }

}

module.exports = reqHelper;