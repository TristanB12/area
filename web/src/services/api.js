const axios = require('axios');
const baseUrl = "https://ikeapi.herokuapp.com";
const mockAreas = require('../mock/areas.js');
const mockServices = require('../mock/services.js');

const getUserInfos = async () => {
    let config = {
        method: 'get',
        url: baseUrl + '/user',
        headers: { 
            'authorization': 'Bearer ' + localStorage.getItem('access_token'), 
            'Content-Type': 'application/json'
        },
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const loginUser = async (inputs) => {
    let config = {
        method: 'post',
        url: baseUrl + '/auth/login?service=area',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            ...inputs
        }
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const signupUser = async (inputs) => {
    let config = {
        method: 'post',
        url: baseUrl + '/auth/signup/area',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            ...inputs
        }
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const verifyToken = async (token) => {
    let config = {
        method: 'get',
        url: baseUrl + '/token/verify',
        headers: { 
            'authorization': 'Bearer ' + token
        }
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const getUserAreas = async () => {
    let config = {
        method: 'get',
        url: baseUrl + '/area',
        headers: { 
            'authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const getServices = async () => {
    let config = {
        method: 'get',
        url: baseUrl + '/service',
        headers: { 
            'authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

module.exports = {
    loginUser,
    signupUser,
    verifyToken,
    getUserAreas,
    getServices,
    getUserInfos
}