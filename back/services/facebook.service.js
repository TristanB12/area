require('dotenv').config();
const facebook = require('../controllers/facebook.controller');

const facebookService = {
  tags: ["link", "auth"],
  authRef: 'facebook',
  link: {
    accessTokenUrlOption: facebook.accessTokenUrlOption,
    desactive: facebook.unlink,
  },
  auth: {
    signup: facebook.signup,
    login: facebook.login
  },
  links: {
    clientID: {
      web: process.env.FACEBOOK_CLIENT_ID_WEB,
      ios: process.env.FACEBOOK_CLIENT_ID_IOS,
      android: process.env.FACEBOOK_CLIENT_ID_ANDROID,
      dev: process.env.FACEBOOK_CLIENT_ID_WEB,
    },
    redirectUri: {
      web: process.env.FACEBOOK_REDIRECT_URI_WEB,
      ios: process.env.FACEBOOK_REDIRECT_URI_IOS,
      android: process.env.FACEBOOK_REDIRECT_URI_ANDROID,
      dev: process.env.FACEBOOK_REDIRECT_URI_DEV,
    },
    clientSecret: {
      web: process.env.FACEBOOK_CLIENT_SECRET_WEB,
      ios: process.env.FACEBOOK_CLIENT_SECRET_IOS,
      android: process.env.FACEBOOK_CLIENT_SECRET_ANDROID,
      dev: process.env.FACEBOOK_CLIENT_SECRET_WEB
    },
    scope: "email,public_profile",
    authorizationEndpoint: "https://www.facebook.com/v12.0/dialog/oauth",
  },
  refreshToken: undefined,
};

module.exports = facebookService;