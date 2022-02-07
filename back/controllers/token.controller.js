require('dotenv').config()
const jwt = require("jsonwebtoken");
const mjwt = require('../controllers/jwt');
const axios = require('axios')

/**
 * Refresh the user access_token with refresh_token given at account creation
 * @param {s} req 
 * @param {*} res 
 * @returns 
 */
function refreshAreaAccessToken(req, res) {
  const refreshToken = req.refreshToken;

  try {
    const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    const response = {
      access_token: mjwt.generateAccessToken(decode.user_id, decode.email),
      refresh_token: refreshToken,
      expires_in: (process.env.ACCESS_TOKEN_EXPIRATION_HOUR * 60) * 60,
      token_type: "Bearer",
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token.' });
  }
}

/**
 * Verify if the area access token expired
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
function verifyAreaAccessToken(req, res) {
  return res.status(200).json({ message: 'Token is valid.' });
}

/**
 * Make the request to the specific service to get an access_token/refresh_token
 * @param {*} axiosOpts 
 * @returns access_token/refresh_token of specific service
 */
 async function getServiceAccessToken(axiosOpts) {
  try {
    var response = await axios(axiosOpts);
  } catch (error) {
    console.log(error);
    return { data: undefined, error };
  }
  return { data: response.data, error: "" };
}

module.exports = { refreshAreaAccessToken, verifyAreaAccessToken, getServiceAccessToken };