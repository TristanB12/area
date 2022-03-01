const spotifyReaction = require('../reaction/spotify.reaction');
const spotify = require('../controllers/spotify.controller');

const spotifyService = {
  tags: ["link", "actions", "reactions"],
  authRef: "spotify",
  logoUri: "https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM",
  link: {
    accessTokenUrlOption: spotify.accessTokenUrlOption,
    desactive: spotify.unlink
  },
  refreshToken: spotify.refreshAccessToken,
  actions: [

  ],
  reactions: [
    {
      tag: "SPO#FOLW",
      title: "Then follow a given artist",
      service: {
        name: "spotify",
        logoUri: "https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM",
      },
      requiresUserAuth: true,
      config: {
        "Artist name": {
          type: 'text',
          value: ""
        }
      },
      function: spotifyReaction.reactionFollowArtist,
    }
  ]
};

module.exports = spotifyService;