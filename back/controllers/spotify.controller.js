require('dotenv').config();
const db = require('../models');
const axios = require('axios');
const User = db.user;

/**
 * Url to get access_token for spotify service
 * @param {*} code 
 * @param {*} redirect_uri
 * @returns 
 */
function accessTokenUrlOption(code, link) {
  return {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${link.clientID}:${link.clientSecret}`).toString('base64')}`
    },
    params: {
      code,
      grant_type: 'authorization_code',
      redirect_uri: link.redirectUri
    }
  };
}

async function refreshAccessToken(user, link) {
  const { refresh_token } = user.services.spotify;

  const option = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${link.clientID}:${link.clientSecret}`).toString('base64')}`
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token
    }
  };

  try {
    const response = await axios(option);
    const access_token = response.data.access_token;

    await User.findByIdAndUpdate({ _id: user._id }, { 'services.spotify.access_token': access_token });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
/**
 * Unlink spotify account
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function unlink(req, res) {
  return res.status(200).json({ message: 'spotify account unliked successfully.' });
}

module.exports = { refreshAccessToken, accessTokenUrlOption, unlink };