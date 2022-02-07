const microsoft = require('../controllers/microsoft.controller');
const spotifyService = require('./spotify.service');

const microsoftService = {
  tags: ["link"],

  link: {
    accessTokenUrlOption: microsoft.accessTokenUrlOption,
    refreshToken: undefined,
  },
};

module.exports = microsoftService;