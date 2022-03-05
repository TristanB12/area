require('dotenv').config();
const axios = require('axios');

async function getCurrentUserID(accessToken, clientID) {
    let config = {
        method: 'get',
        url: 'https://api.twitch.tv/helix/users',
        headers: {
            'client-ID': clientID,
            'Authorization': 'Bearer ' + accessToken
        }
    };
    const res = await axios(config);
    return res.data;
}

async function getOnlineStreamers(accessToken, userID, clientID) {
    var config = {
        method: 'get',
        url: 'https://api.twitch.tv/helix/streams/followed',
        headers: {
            'client-ID': clientID,
            'Authorization': 'Bearer ' + accessToken
        },
        params: {
            user_id: userID,
        }
    };

    const res = await axios(config);
    return res.data;
}

async function actionWhenStreamerIsOnline(user, area, link) {
    console.log(link);
    const { action } = area;
    const resUserID = await getCurrentUserID(user.services.twitch.access_token, link.clientID);
    console.log(resUserID);
    const res = await getOnlineStreamers(user.services.twitch.access_token, resUserID.data.id, link.clientID);

    console.log(res);
    for (let streamer of res.data) {
        if (streamer.user_name.toLowerCase() == action.config["Streamer name"].value.toLowerCase()) {
            return { error: false, data: true };
        }
    }
    return { error: false, data: false };
}

module.exports = { actionWhenStreamerIsOnline };