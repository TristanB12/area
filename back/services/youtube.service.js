const youtubeAction = require('../action/youtube.action');
const google = require('../controllers/google.controller');

const youtubeService = {
  tags: ["actions"],
  refreshToken: google.refreshAccessToken,
  actions: [
    {
      tag: "YT#UPL04D",
      title: "When a new video is upload on a Youtube account.",
      service: {
        name: "Youtube",
        logoUri: "https://www.pngkit.com/png/detail/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png"
      },
      requiresUserAuth: true,
      config: {
        username: {
          type: "string",
        }
      },
      function: youtubeAction.actionVideoIsUpload,
    }
  ]
};

module.exports = youtubeService;