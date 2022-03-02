const services = require('../services');

/**
 * Manage all signup services of area
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function signup(req, res) {
  const serviceName = req.service;
  const { platform } = req;

  try {
    req.link = !services[serviceName].links ? null : {
      platform,
      clientID: services[serviceName].links.clientID[platform],
      redirectUri: services[serviceName].links.redirectUri[platform],
      clientSecret: services[serviceName].links.clientSecret[platform],
      scope: services[serviceName].links.scope
    };
    return services[serviceName].auth.signup(req, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: 'Specified service does not exist or support signup.'})
  }
}

/**
 * Manage all login servuices of area
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function login(req, res) {
  const serviceName = req.service;
  const { platform } = req;

  try {
    req.link = !services[serviceName].links ? null : {
      platform,
      clientID: services[serviceName].links.clientID[platform],
      redirectUri: services[serviceName].links.redirectUri[platform],
      clientSecret: services[serviceName].links.clientSecret[platform],
      scope: services[serviceName].links.scope
    };
    return services[serviceName].auth.login(req, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: 'Specified service does not exist or support login.'})
  }
}

module.exports = { login, signup };