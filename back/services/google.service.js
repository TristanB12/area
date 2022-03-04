require('dotenv').config();
const google = require('../controllers/google.controller');

const googleService = {
  tags: ["link", "auth"],
  authRef: 'google',
  link: {
    accessTokenUrlOption: google.accessTokenUrlOption,
    desactive: google.unlink
  },
  auth: {
    signup: google.signup,
    login: google.login,
  },
  links: {
    clientID: {
      web: process.env.GOOGLE_CLIENT_ID_WEB,
      ios: process.env.GOOGLE_CLIENT_ID_IOS,
      android: process.env.GOOGLE_CLIENT_ID_ANDROID,
      dev: process.env.GOOGLE_CLIENT_ID_WEB
    },
    redirectUri: {
      web: process.env.GOOGLE_REDIRECT_URI_WEB,
      ios: process.env.GOOGLE_REDIRECT_URI_IOS,
      android: process.env.GOOGLE_REDIRECT_URI_ANDROID,
      dev: process.env.GOOGLE_REDIRECT_URI_DEV
    },
    clientSecret: {
      web: process.env.GOOGLE_CLIENT_SECRET_WEB,
      ios: process.env.GOOGLE_CLIENT_SECRET_IOS,
      android: process.env.GOOGLE_CLIENT_SECRET_ANDROID,
      dev: process.env.GOOGLE_CLIENT_SECRET_WEB,
    },
    scope: "profile email https://www.googleapis.com/auth/youtube https://mail.google.com/",
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  },
  refreshToken: google.refreshAccessToken,
};

module.exports = googleService;