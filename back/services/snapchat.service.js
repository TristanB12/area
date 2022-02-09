const snapchat = require('../controllers/snapchat.controller');

const snapchatService = {
  tags: ["link"],
  link: {
    accessTokenUrlOption: snapchat.accessTokenUrlOption,
    refreshToken: undefined
  },
};

module.exports = snapchatService;