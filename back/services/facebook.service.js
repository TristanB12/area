const facebook = require('../controllers/facebook.controller');

const facebookService = {
  tag: ["link", "auth"],
  link: {
    accessTokenUrlOption: facebook.accessTokenUrlOption,
    refreshToken: undefined,
    desactive: facebook.unlink,
  },
  auth: {
    signup: facebook.signup,
    login: facebook.login
  }
};

module.exports = facebookService;