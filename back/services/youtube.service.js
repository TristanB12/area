const youtubeAction = require('../action/youtube.action');
const google = require('../controllers/google.controller');

const youtubeService = {
  tags: ["actions"],
  authRef: 'google',
  logoUri: "https://www.pngkit.com/png/detail/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png",
  refreshToken: google.refreshAccessToken,
  actions: [
    {
      tag: "YT#UPL04D",
      title: "When a new video is upload on a Youtube account.",
      service: {
        name: "youtube",
        logoUri: "https://www.pngkit.com/png/detail/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png"
      },
      requiresUserAuth: true,
      config: {
        "Youtuber name": {
          type: "text",
          value: "",
      },
      binding: {
        "Published at": {
          type: "text",
        },
        title: {
          type: "text",
        },
        description: {
          type: "text",
        },
        "Channel title": {
          type: "text",
        },
        "Video url": {
          type: "text"
        }
      }
      },
      function: youtubeAction.actionVideoIsUpload,
    },
    {
      tag: "YT#SU82RI83",
      title: "When you subscribe to a new channel",
      service: {
        name: "youtube",
        logoUri: "https://www.pngkit.com/png/detail/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png"
      },
      requiresUserAuth: true,
      config: {},
      binding: {},
      function: youtubeAction.actionNewSubscribe,
    }
  ]
};

module.exports = youtubeService;