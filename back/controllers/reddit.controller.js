const db = require('../models');
const axios = require('axios');
const User = db.user;
const qs = require('qs');

function accessTokenUrlOption(code, link) {
  return {
    url: 'https://www.reddit.com/api/v1/access_token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${link.clientID}:${link.clientSecret}`).toString('base64')}`
    },
    data: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: link.redirectUri
    },

    transformRequest: [function (data, headers) {
      return qs.stringify(data);
    }],
  };
}

async function refreshAccessToken(user, link) {
  const { refresh_token } = user.services.reddit;

  const option = {
    url: 'https://www.reddit.com/api/v1/access_token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${link.clientID}:${link.clientSecret}`).toString('base64')}`
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token
    },
    transformRequest: [function (data, headers) {
      return qs.stringify(data);
    }]
  };

  try {
    const response = await axios(option);
    const access_token = response.data.access_token;

    await User.findByIdAndUpdate({ _id: user._id }, { 'services.reddit.access_token': access_token });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function unlink(req, res) {
  return res.status(200).json({ message: 'reddit account unliked successfully.' });
}

module.exports = { refreshAccessToken, accessTokenUrlOption, unlink };