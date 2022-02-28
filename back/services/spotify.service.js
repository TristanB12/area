const spotify = require('../controllers/spotify.controller');

const spotifyService = {
  tags: ["link"],
  authRefs: "spotify",
  link: {
    accessTokenUrlOption: spotify.accessTokenUrlOption,
    desactive: spotify.unlink
  },
  refreshToken: undefined,
};

module.exports = spotifyService;