require('dotenv');
const reddit = require('../controllers/reddit.controller');
const redditAction = require('../action/reddit.action');

const redditService = {
  tags: ["link", "actions"],
  authRef: "reddit",
  logoUri: "http://assets.stickpng.com/images/5847e9efcef1014c0b5e482e.png",
  link: {
    accessTokenUrlOption: reddit.accessTokenUrlOption,
    desactive: reddit.unlink
  },
  links: {
    clientID: {
      web: process.env.REDDIT_CLIENT_ID_WEB,
      ios: process.env.REDDIT_CLIENT_ID_IOS,
      android: process.env.REDDIT_CLIENT_ID_ANDROID,
      dev: process.env.REDDIT_CLIENT_ID_DEV,
    },
    redirectUri: {
      web: process.env.REDDIT_REDIRECT_URI_WEB,
      ios: process.env.REDDIT_REDIRECT_URI_IOS,
      android: process.env.REDDIT_REDIRECT_URI_ANDROID,
      dev: process.env.REDDIT_REDIRECT_URI_DEV,
    },
    clientSecret: {
      web: process.env.REDDIT_CLIENT_SECRET_WEB,
      ios: process.env.REDDIT_CLIENT_SECRET_IOS,
      android: process.env.REDDIT_CLIENT_SECRET_ANDROID,
      dev: process.env.REDDIT_CLIENT_SECRET_DEV,
    },
    scope: "identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread",
    authorizationEndpoint: "https://www.reddit.com/api/v1/authorize",
  },
  actions: [
    {
      tag: 'RT#5U85RC183',
      title: "When I get a new follower",
      service: {
        name: "reddit",
        logoUri: "http://assets.stickpng.com/images/5847e9efcef1014c0b5e482e.png",
      },
      requiresUserAuth: true,
      config: null,
      function: redditAction.actionSubscribeToMe,
    }
  ],
  refreshToken: reddit.refreshAccessToken,
};

module.exports = redditService;