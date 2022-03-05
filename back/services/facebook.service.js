require('dotenv').config();
const facebook = require('../controllers/facebook.controller');

const facebookService = {
  tags: ["link", "auth"],
  authRef: 'facebook',
  logoUri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.defontaine-construction.fr%2Factualites%2Ffacebook-logo-png-transparent-background%2F&psig=AOvVaw0yQ_WnoUHrtY0dxHAOCXyc&ust=1646481873607000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIil0461rPYCFQAAAAAdAAAAABAJ",
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