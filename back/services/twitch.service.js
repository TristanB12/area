require('dotenv');
const twitch = require('../controllers/twitch.controller');

const twitchService = {
  tags: ["link"],
  authRef: "twitch",
  logoUri: "https://seeklogo.com/images/R/reddit-logo-23F13F6A6A-seeklogo.com.png",
  link: {
    accessTokenUrlOption: twitch.accessTokenUrlOption,
    desactive: twitch.unlink
  },
  links: {
    clientID: {
      web: process.env.TWITCH_CLIENT_ID_WEB,
      ios: process.env.TWITCH_CLIENT_ID_IOS,
      android: process.env.TWITCH_CLIENT_ID_ANDROID,
      dev: process.env.TWITCH_CLIENT_ID_WEB,
    },
    redirectUri: {
      web: process.env.TWITCH_REDIRECT_URI_WEB,
      ios: process.env.TWITCH_REDIRECT_URI_IOS,
      android: process.env.TWITCH_REDIRECT_URI_ANDROID,
      dev: process.env.TWITCH_REDIRECT_URI_DEV,
    },
    clientSecret: {
      web: process.env.TWITCH_CLIENT_SECRET_WEB,
      ios: process.env.TWITCH_CLIENT_SECRET_IOS,
      android: process.env.TWITCH_CLIENT_SECRET_ANDROID,
      dev: process.env.TWITCH_CLIENT_SECRET_WEB,
    },
    scope: "user:read:follows",
    authorizationEndpoint: "https://id.twitch.tv/oauth2/authorize",
  },
  refreshToken: undefined,
};

module.exports = twitchService;