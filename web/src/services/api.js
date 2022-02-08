const axios = require('axios');
const baseUrl = "/api";

const loginUser = async (inputs) => {
    let config = {
        method: 'post',
        url: baseUrl + '/auth/login',
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
        url: baseUrl + '/auth/signup',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email: inputs.email,
            password: inputs.password,
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
}