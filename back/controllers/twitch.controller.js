require('dotenv').config();
const db = require('../models');
const axios = require('axios');
const User = db.user;

function accessTokenUrlOption(code, link) {
    return {
        url: 'https://id.twitch.tv/oauth2/token',
        method: 'POST',
        params: {
            client_id: link.clientID,
            client_secret: link.clientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: link.redirectUri
        }
    };
}

async function refreshAccessToken(user, link) {
    const { refresh_token } = user.services.twitch;

    const option = {
        url: 'https://id.twitch.tv/oauth2/token',
        method: 'POST',
        params: {
            grant_type: 'refresh_token',
            scope: 'user:read:follows',
            client_id: link.clientID,
            client_secret: link.clientSecret,
            redirect_uri: link.redirectUri,
            refresh_token
        }
    };

    try {
        const response = await axios(option);
        const access_token = response.data.access_token;

        await User.findByIdAndUpdate({ _id: user._id }, { 'services.twitch.access_token': access_token });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function unlink(req, res) {
    return res.status(200).json({ message: 'spotify account unliked successfully.' });
}

module.exports = { refreshAccessToken, accessTokenUrlOption, unlink };