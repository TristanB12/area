const google = require('../controllers/google.controller');

const googleService = {
  tags: ["link", "auth"],
  link: {
    accessTokenUrlOption: google.accessTokenUrlOption,
    desactive: google.unlink
  },
  auth: {
    signup: google.signup,
    login: google.login,
  },
  refreshToken: google.refreshAccessToken,
};

module.exports = googleService;