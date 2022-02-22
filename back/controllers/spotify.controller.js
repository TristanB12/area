require('dotenv').config();

/**
 * Url to get access_token for spotify service
 * @param {*} code 
 * @param {*} redirect_uri
 * @returns 
 */
function accessTokenUrlOption(code, redirect_uri) {
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
      redirect_uri
    }
  };
}

/**
 * Unlink spotify account
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 async function unlink(req, res)
 {
   return res.status(200).json({message: 'spotify account unliked successfully.'});
 }

module.exports = { accessTokenUrlOption, unlink };