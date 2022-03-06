require('dotenv').config();
const axios = require('axios');
const tokenController = require('./token.controller');
const db = require('../models');
const mjwt = require('./jwt');
const User = db.user;

/**
 * Url to get access_token for github service
 * @param {*} code 
 * @returns 
 */
function accessTokenUrlOption(code, link, code_verifier) {
    return {
      url: 'https://github.com/login/oauth/access_token',
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      params: {
        'client_id': link.clientID,
        'client_secret': link.clientSecret,
        code,
        redirect_uri: link.redirectUri,
        code_verifier
      }
    };
}

async function unlink(req, res)
{
  return res.status(200).json({message: 'github account unliked successfully.'});
}

module.exports = { accessTokenUrlOption, unlink }