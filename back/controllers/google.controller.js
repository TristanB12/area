require('dotenv').config();
const axios = require('axios');
const tokenController = require('./token.controller');
const db = require('../models');
const mjwt = require('./jwt');

const User = db.user;

/**
 * Url to get access_token for google service
 * @param {*} code
 * @param {*} redirect_uri 
 * @returns 
 */
function accessTokenUrlOption(code, redirect_uri) {
  return {
    url: 'https://oauth2.googleapis.com/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri,
      grant_type: 'authorization_code',
    }
  };
}

async function refreshAccessToken(user) {
  const { refresh_token } = user.services.google;

  const option = {
    url: 'https://oauth2.googleapis.com/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token
    }
  }

  try {
    const response = await axios(option);
    const access_token = response.data.access_token;

    await User.findByIdAndUpdate({_id: user._id}, { 'services.google.access_token':access_token });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Get google user information
 * @param {*} access_token 
 * @returns User information
 */
async function getUserInfo(access_token) {
  const options = {
    url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
    method: 'GET',
  };

  return await axios(options);
}

/**
 * Login function for service google
 * @param {*} req 
 * @param {*} res 
 * @returns Responce to client request (400: Problem with credentials / 200: Success login)
 */
async function login(req, res) {
  const { code } = req.query;
  const { redirect_uri } = req.query;

  if (!code)
    return res.status(400).json({ mesage: 'You should provide code.' });
  if (!redirect_uri)
    return res.status(400).json({ message: 'No redirect_uri.' });
  const response = await tokenController.getServiceAccessToken(accessTokenUrlOption(code, redirect_uri));

  if (response.data === undefined)
    return res.status(400).json({ message: 'Problem to auth with the given code.' });
  try {
    googleUser = await getUserInfo(response.data.access_token);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Can not obtain information about the user.' });
  }

  let user = await User.findOne({ 'auth.email': googleUser.data.email });
  if (!user)
    return res.status(400).json({ message: "No google account register with this email." });
  if (user.auth.auth_type != 'google')
    return res.status(400).json({ message: `Email address is assigned with a ${user.auth.auth_type} account.` });
  await User.findByIdAndUpdate({ _id: user._id }, {
    $set: {
      'services.google': {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token
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
 * Signup function for google service
 * @param {*} req 
 * @param {*} res 
 * @returns Responce to client request (400: Problem with credentials / 201: Success signup)
 */
async function signup(req, res) {
  const { code } = req.query;
  const { redirect_uri } = req.query;

  let googleUser = undefined;

  if (!code)
    return res.status(400).json({ mesage: 'You should provide code.' });
  if (!redirect_uri)
    return res.status(400).json({ message: 'No redirect_uri.' });

    const response = await tokenController.getServiceAccessToken(accessTokenUrlOption(code, redirect_uri));

  if (response.data === undefined)
    return res.status(400).json({ message: 'Problem to link the service with the given code.' });

  try {
    googleUser = await getUserInfo(response.data.access_token);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Can not obtain information about the user.' });
  }

  let oldUser = await User.findOne({ 'auth.email': googleUser.data.email });;

  if (oldUser)
    return res.status(400).json({ message: `Email address is already assigned with a ${oldUser.auth.auth_type} account.` });

  let user = await User.create({
    auth: {
      auth_type: 'google',
      email: googleUser.data.email,
      refresh_token: "",
    },
    email_verified: googleUser.data.verified_email,
    services: {
      google: {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token
      }
    }
  });
  const refreshToken = mjwt.generateRefreshToken(user._id, user.auth.email);
  let createdUser = await User.findOneAndUpdate({ 'auth.email': googleUser.data.email }, { $set: { 'auth.refreshToken': refreshToken } });

  return res.status(201).json({
    access_token: mjwt.generateAccessToken(createdUser._id, createdUser.auth.email),
    token_type: "Bearer",
    expires_in: (process.env.ACCESS_TOKEN_EXPIRATION_HOUR * 60) * 60,
    refresh_token: refreshToken,
  });
}

/**
 * Unlink google account
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 async function unlink(req, res)
 {
   return res.status(200).json({message: 'google account unliked successfully.'});
 }

module.exports = { accessTokenUrlOption, signup, login, unlink, refreshAccessToken };
