require('dotenv').config();
const qs = require('qs');

/**
 * Url to get access_token for microsoft service
 * @param {*} code 
 * @param {*} redirect_uri
 * @returns 
 */
function accessTokenUrlOption(code, link) {
  return {
    url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      grant_type: 'authorization_code',
      client_id: link.clientID,
      client_secret: link.clientSecret,
      redirect_uri: link.redirectUri,
      code,
    },

    transformRequest: [function (data, headers) {
      return qs.stringify(data);
    }],
  };
}

/**
 * Unlink microsoft account
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function unlink(req, res) {
  return res.status(200).json({ message: 'microsoft account unliked successfully.' });
}

module.exports = { accessTokenUrlOption, unlink };