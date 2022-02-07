require('dotenv').config();
const qs = require('qs');

/**
 * Url to get access_token for microsoft service
 * @param {*} code 
 * @returns 
 */
function accessTokenUrlOption(code) {
  return {
    url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      grant_type: 'authorization_code',
      client_id: process.env.MICROSOFT_CLIENT_ID,
      client_secret: process.env.MICROSOFT_CLIENT_SECRET,
      redirect_uri: process.env.MICROSOFT_REDIRECT_URI,
      code,
    },

    transformRequest: [function (data, headers) {
      return qs.stringify(data);
    }],
  };
}

module.exports = { accessTokenUrlOption };