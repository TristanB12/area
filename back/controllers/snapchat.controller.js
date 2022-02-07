require('dotenv').config();

function accessTokenUrlOption(code) {
  return {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${process.env.SNAPCHAT_CLIENT_ID}:${process.env.SNAPCHAT_CLIENT_SECRET}`).toString('base64')}`
    },
    params: {
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.SNAPCHAT_REDIRECT_URI
    }
  };
}

module.exports = { accessTokenUrlOption };