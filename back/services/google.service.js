const google = require('../controllers/google.controller');

const googleService = {
  tags: ["link", "auth"],
  link: {
    accessTokenUrlOption: google.accessTokenUrlOption,
    refreshToken: google.refreshAccessToken,
    desactive: google.unlink
  },
  auth: {
    signup: google.signup,
    login: google.login,
  }
};

module.exports = googleService;