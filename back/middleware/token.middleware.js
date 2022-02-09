require('dotenv').config()
const jwt = require("jsonwebtoken");
const db = require('../models');

const User = db.user;

const getAccessTokenFromHeader = (headers) => {
  try {
    const { authorization } = headers;
    if (!authorization)
      return undefined;
    return authorization.split(' ')[1];
  } catch (err) {
    return undefined;
  }
}

/**
 * Verify if the given access_token is valid.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyAccessToken = async (req, res, next) => {
  const token = req.query.access_token || req.headers["access_token"] || getAccessTokenFromHeader(req.headers);

  if (!token)
    return res.status(403).send({ message: "An access_token is required for authentication." });
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    const user = await User.findById(decoded.user_id);

    if (!user)
      return res.status(401).json({ message: 'The token is assigned to no user.' })
    req.user = user;
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token." });
  }
  return next();
};

/**
 * Get the refresh token from the query
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const getRefreshToken = (req, res, next) => {
  const refreshToken = req.query.refresh_token;

  if (!refreshToken)
    return res.status(403).send({ message: "A refresh_token is required for refreshing the the access token." });
  req.refreshToken = refreshToken;
  return next();
}

module.exports = { verifyAccessToken, getRefreshToken };