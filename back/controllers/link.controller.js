const db = require('../models');
const services = require('../services');
const tokenController = require('./token.controller');

const User = db.user;

async function unlinkService(req, res)
{
  const serviceName = req.service;

  try {
    let userServices = req.user.services;
    
    if (userServices[serviceName] == undefined && services[serviceName])
      return res.status(400).json({message: 'User not linked to specified service.'});

    services[serviceName].link.desactive(req, res);
    const { user } = req;
    userServices[serviceName].access_token = null;
    userServices[serviceName].refresh_token = null;

    await User.findByIdAndUpdate({ _id: user._id }, { services: userServices });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Specified service does not exist or support unlink.' });
  }
}

/**
 * Link the spefic service for a special user (access_token/refresh_token)
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function linkService(req, res) {
  const serviceName = req.service;
  const { code } = req.query;
  const { redirect_uri } = req.query;

  if (!code)
    return res.status(200).json({ message: 'Code is required.' });
  if (!redirect_uri)
    return res.status(400).json({ message: 'No redirect_uri.' });

  const user = req.user;
  let userServices = user.services;
  try {
    const axiosOpts = services[serviceName].link.accessTokenUrlOption(code, redirect_uri);
    const response = await tokenController.getServiceAccessToken(axiosOpts);

    if (response.data === undefined)
      return res.status(400).json({ message: 'Problem to link the service with the given code.' });
    userServices[serviceName] = {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token || undefined
    }
    await User.findByIdAndUpdate({ _id: user._id }, { services: userServices });
    return res.status(200).json({ message: `${serviceName} account linked successfully.` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Specified service does not exist or support link.' })
  }
}

module.exports = { linkService, unlinkService };