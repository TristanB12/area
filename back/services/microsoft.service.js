require('dotenv').config();
const microsoft = require('../controllers/microsoft.controller');

const microsoftService = {
  tags: ["link"],
  authRef: 'microsoft',
  link: {
    accessTokenUrlOption: microsoft.accessTokenUrlOption,
    desactive: microsoft.unlink,
  },
  links: {
    clientID: {
      web: process.env.MICROSOFT_CLIENT_ID_WEB,
      ios: process.env.MICROSOFT_CLIENT_ID_IOS,
      android: process.env.MICROSOFT_CLIENT_ID_ANDROID,
      dev: process.env.MICROSOFT_CLIENT_ID_WEB
    },
    redirectUri: {
      web: process.env.MICROSOFT_REDIRECT_URI_WEB,
      ios: process.env.MICROSOFT_REDIRECT_URI_IOS,
      android: process.env.MICROSOFT_REDIRECT_URI_ANDROID,
      dev: process.env.MICROSOFT_REDIRECT_URI_DEV,
    },
    clientSecret: {
      web: process.env.MICROSOFT_CLIENT_SECRET_WEB,
      ios: process.env.MICROSOFT_CLIENT_SECRET_IOS,
      android: process.env.MICROSOFT_CLIENT_SECRET_ANDROID,
      dev: process.env.MICROSOFT_CLIENT_SECRET_WEB,
    },
    scope: "https://graph.microsoft.com/User.Read offline_access",
    authorizationEndpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  },
  refreshToken: undefined,
};

module.exports = microsoftService;