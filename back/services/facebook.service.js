const facebook = require('../controllers/facebook.controller');

const facebookService = {
  tags: ["link", "auth"],
  link: {
    accessTokenUrlOption: facebook.accessTokenUrlOption,
    desactive: facebook.unlink,
  },
  auth: {
    signup: facebook.signup,
    login: facebook.login
  },
  refreshToken: undefined,
};

module.exports = facebookService;