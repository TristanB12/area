const axios = require('axios');
const baseUrl = "https://ikeapi.herokuapp.com";
const mockAreas = require('../mock/areas.js');
const mockServices = require('../mock/services.js');

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
    var config = {
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
    return [mockAreas, null];
}

const getServices = async () => {
    return [mockServices, null];
}

module.exports = {
    loginUser,
    signupUser,
    verifyToken,
    getUserAreas,
    getServices
}