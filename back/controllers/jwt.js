require('dotenv').config();

const jwt = require('jsonwebtoken');

/**
 * Generate an access token link to the given user ID wich expires in ACCESS_TOKEN_EXPIRATION_HOUR hour(s).
 * @param {*} user_id User ID given to generator the access token
 * @param {*} email Email given to generator the access token 
* @returns access token
 */
function generateAccessToken(user_id, email = "") {
  return jwt.sign({
    user_id: user_id,
    email
  },
    process.env.ACCESS_TOKEN_KEY, { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRATION_HOUR}h` }
  );
}

/**
 * Generate a refresh token link to the given user ID wich will never expire.
 * @param {*} user_id User ID given to generator the refresh token
 * @param {*} email Email given to generator the access token  
* @returns refresh token
 */
function generateRefreshToken(user_id, email = "") {
  return jwt.sign({
    user_id: user_id,
    email
  },
    process.env.REFRESH_TOKEN_KEY
  );
}

module.exports = { generateAccessToken, generateRefreshToken };