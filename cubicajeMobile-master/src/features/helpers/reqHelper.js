import axios from 'axios';

const axiosInstance = axios.create();

async function reqHelper(url, method, body) {
    try {
        const { data } = await axiosInstance({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            url,
            method: method,
            data: body
        })
        return data;
    } catch (error) {
        return error;
    }

}

module.exports = reqHelper;