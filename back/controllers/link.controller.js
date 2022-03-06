const db = require('../models');
const services = require('../services');
const tokenController = require('./token.controller');

const User = db.user;

async function unlinkService(req, res) {
  let serviceName = req.service;

  try {
    if (!services[serviceName].tags.includes('link') && services[services[serviceName].authRef].tags.includes('link'))
      serviceName = services[serviceName].authRef;
    let userServices = req.user.services;

    if (userServices[serviceName] == undefined && services[serviceName])
      return res.status(400).json({ message: 'User not linked to specified service.' });

    services[serviceName].link.desactive(req, res);
    const { user } = req;
    delete userServices[serviceName];

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
  let serviceName = req.service;
  const { code } = req.query;
  const { platform } = req;
  const { code_verifier } = req.query;

  if (!code)
    return res.status(200).json({ message: 'Code is required.' });

  const user = req.user;
  let userServices = user.services;
  try {
    if (!services[serviceName].tags.includes('link') && services[services[serviceName].authRef].tags.includes('link'))
      serviceName = services[serviceName].authRef;
    const link = !services[serviceName].links ? null : {
      platform,
      clientID: services[serviceName].links.clientID[platform],
      redirectUri: services[serviceName].links.redirectUri[platform],
      clientSecret: services[serviceName].links.clientSecret[platform],
      scope: services[serviceName].links.scope
    };
    let axiosOpts = services[serviceName].link.accessTokenUrlOption(code, link, code_verifier);
    const response = await tokenController.getServiceAccessToken(axiosOpts);

    if (response.data === undefined)
      return res.status(400).json({ message: 'Problem to link the service with the given code.' });
    userServices[serviceName] = {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token || undefined,
      latestPlatformUsed: link.platform
    }
    await User.findByIdAndUpdate({ _id: user._id }, { services: userServices });
    return res.status(200).json({ message: `${serviceName} account linked successfully.` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Specified service does not exist or support link.' })
  }
}

module.exports = { linkService, unlinkService };