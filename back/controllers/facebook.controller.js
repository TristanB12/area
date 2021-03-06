require('dotenv').config();
const axios = require('axios');
const tokenController = require('./token.controller');
const db = require('../models');
const mjwt = require('./jwt');

const User = db.user;

/**
 * Get facebook user information
 * @param {*} access_token 
 * @param {*} fields_list 
 * @returns 
 */
async function getUserInfos(access_token, fields_list) {
  const options = {
    url: 'https://graph.facebook.com/me',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
    params: {
      fields: fields_list.join(',')
    }
  };

  return await axios(options);
}

/**
 * Url to get access_token for facebook service
 * @param {*} code 
 * @param {*} redirect_uri
 * @returns 
 */
function accessTokenUrlOption(code, link) {
  return {
    url: 'https://graph.facebook.com/v12.0/oauth/access_token',
    method: 'GET',
    params: {
      client_id: link.clientID,
      redirect_uri: link.redirectUri,
      client_secret: link.clientSecret,
      code,
      scope: link.scope,
    }
  }
}

/**
 * Login function for service facebook
 * @param {*} req 
 * @param {*} res 
 * @returns Responce to client request (400: Problem with credentials / 200: Success login)
 */
async function login(req, res) {
  const { code } = req.query;
  let { access_token } = req.query;
  const { link } = req;

  if (!code && !access_token)
    return res.status(400).json({ mesage: 'You should provide code.' });

  if (!access_token) {
    const response = await tokenController.getServiceAccessToken(accessTokenUrlOption(code, link));
    if (response.data === undefined)
      return res.status(400).json({ message: 'Problem to auth with the given code.' });
    access_token = response.data.access_token;
  }

  try {
    facebookUser = await getUserInfos(access_token, ["email"]);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Can not obtain information about the user.' });
  }

  let user = await User.findOne({ 'auth.email': facebookUser.data.email });;

  if (!user)
    return res.status(400).json({ message: "No facebook account register with this email." });
  if (user.auth.auth_type != 'facebook')
    return res.status(400).json({ message: `Email address is assigned with a ${user.auth.auth_type} account.` });
  await User.findByIdAndUpdate({ _id: user._id }, {
    $set: {
      'services.facebook': {
        access_token: access_token,
        refresh_token: undefined,
        latestPlatformUsed: link.platform
      }
    }
  });
  return res.status(200).json({
    access_token: mjwt.generateAccessToken(user._id),
    token_type: "Bearer",
    expires_in: (process.env.ACCESS_TOKEN_EXPIRATION_HOUR * 60) * 60,
    refresh_token: user.auth.refreshToken,
  });
}

/**
 * Signup function for facebook service
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function signup(req, res) {
  const { code } = req.query;
  let { access_token } = req.query;
  const { link } = req;

  let facebookUser = undefined;

  if (!code && !access_token)
    return res.status(400).json({ mesage: 'You should provide code.' });

  if (!access_token) {
    const response = await tokenController.getServiceAccessToken(accessTokenUrlOption(code, link));

    if (response.data === undefined)
      return res.status(400).json({ message: 'Problem to link the service with the given code.' });
    access_token = response.data.access_token;
  }

  try {
    facebookUser = await getUserInfos(access_token, ["email"]);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Can not obtain information about the user.' });
  }

  let oldUser = await User.findOne({ 'auth.email': facebookUser.data.email });;

  if (oldUser)
    return res.status(400).json({ message: `Email address is already assigned with a ${oldUser.auth.auth_type} account.` });

  let user = await User.create({
    auth: {
      auth_type: 'facebook',
      email: facebookUser.data.email,
      refresh_token: "",
    },
    services: {
      facebook: {
        access_token: access_token,
        refresh_token: null,
        latestPlatformUsed: link.platform
      }
    }
  });
  const refreshToken = mjwt.generateRefreshToken(user._id, user.auth.email);
  let createdUser = await User.findOneAndUpdate({ 'auth.email': facebookUser.data.email }, { $set: { 'auth.refreshToken': refreshToken } });

  return res.status(201).json({
    access_token: mjwt.generateAccessToken(createdUser._id, createdUser.auth.email),
    token_type: "Bearer",
    expires_in: (process.env.ACCESS_TOKEN_EXPIRATION_HOUR * 60) * 60,
    refresh_token: refreshToken,
  });
}

/**
 * Unlink facebook account
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function unlink(req, res) {
  return res.status(200).json({ message: 'facebook account unliked successfully.' });
}

module.exports = { accessTokenUrlOption, signup, login, unlink };