const axios = require('axios');

async function getUserProfile(access_token) {
    const option = {
        url: 'https://gmail.googleapis.com/gmail/v1/users/me/profile',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
    };

    const responce = await axios(option);
    return responce.data;
}

module.exports = { getUserProfile };