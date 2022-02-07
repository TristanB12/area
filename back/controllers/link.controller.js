const { compareSync } = require('bcryptjs');
const db = require('../models');
const services = require('../services');
const tokenController = require('./token.controller');

const User = db.user;

/**
 * Link the spefic service for a special user (access_token/refresh_token)
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function linkService(req, res) {
  const serviceName = req.service;
  const { code } = req.query;

  if (!code)
    return res.status(200).json({ message: 'Code is required.' });

  const user = req.user;
  let userServices = user.services;
  try {
    const axiosOpts = services[serviceName].link.accessTokenUrlOption(code);
    const response = await tokenController.getServiceAccessToken(axiosOpts);

    if (response.data === undefined)
      return res.status(400).json({ message: 'Problem to link the service with the given code.' });
    userServices[serviceName] = {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token
    }
    await User.findByIdAndUpdate({ _id: user._id }, { services: userServices });
    return res.status(200).json({ message: `${serviceName} account linked successfully.` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Specified service does not exist or support link.' })
  }
}

module.exports = { linkService };