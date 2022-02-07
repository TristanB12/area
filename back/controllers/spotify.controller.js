require('dotenv').config();

function accessTokenUrlOption(code) {
  return {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
    },
    params: {
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI
    }
  };
}

module.exports = { accessTokenUrlOption };