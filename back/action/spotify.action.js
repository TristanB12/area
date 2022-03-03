require('dotenv').config();
const db = require('../models');
const axios = require('axios');

const Area = db.area;

async function getUserNbFollowers(accessToken) {
    let config = {
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: { 
            'Authorization': 'Bearer ' + accessToken, 
        }
    }
    const res = await axios(config);
    return res.data;
}

async function actionWhenUserGetFollower(user, area) {
    const { action } = area;
    const { lastNumberOfFollowers } = action.save;
    const response = await getUserNbFollowers(user.services.spotify.access_token);

    if (!lastNumberOfFollowers) {
        await Area.findByIdAndUpdate({ _id: area._id }, { 'action.save.lastNumberOfFollowers': response.followers.total });
        return { error: false, data: false };
    }
    if (lastNumberOfFollowers < response.followers.total) {
        await Area.findByIdAndUpdate({ _id: area._id }, { 'action.save.lastNumberOfFollowers': response.followers.total });
        return { error: false, data: response.followers.total };
    }
    return { error: false, data: false };
}

module.exports = { actionWhenUserGetFollower };