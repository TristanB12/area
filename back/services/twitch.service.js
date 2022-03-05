require('dotenv');
const twitch = require('../controllers/twitch.controller');
const twitchAction = require('../action/twitch.action');

const twitchService = {
  tags: ["link", "actions"],
  authRef: "twitch",
  logoUri: "https://brand.twitch.tv/assets/logos/png/glitch-extruded/2-color/wipeout.png",
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
  actions: [
    {
      tag: "TWCH#STRONLNE",
      title: "When a streamer is online",
      service: {
        name: "twitch",
        logoUri: "https://brand.twitch.tv/assets/logos/png/glitch-extruded/2-color/wipeout.png",
      },
      requiresUserAuth: true,
      config: {
        "Streamer name": {
          type: "text",
          value: ""
        }
      },
      function: twitchAction.actionWhenStreamerIsOnline,
    },
  ]
  refreshToken: twitch.refreshAccessToken,
};

module.exports = twitchService;