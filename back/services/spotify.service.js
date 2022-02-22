const spotify = require('../controllers/spotify.controller');

const spotifyService = {
  tags: ["link"],
  link: {
    accessTokenUrlOption: spotify.accessTokenUrlOption,
    refreshToken: undefined,
    desactive: spotify.unlink
  },
};

module.exports = spotifyService;