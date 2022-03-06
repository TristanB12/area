const youtubeAction = require('../action/youtube.action');
const youtubeReaction = require('../reaction/youtube.reaction');
const google = require('../controllers/google.controller');

const youtubeService = {
  tags: ["actions", "reactions"],
  authRef: 'google',
  logoUri: "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png",
  refreshToken: google.refreshAccessToken,
  actions: [
    {
      tag: "YT#UPL04D",
      title: "When a new video is upload on a Youtube account.",
      service: {
        name: "youtube",
        logoUri: "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png"
      },
      requiresUserAuth: true,
      config: {
        "Youtuber name": {
          type: "text",
          value: "",
        }
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
      },
      function: youtubeAction.actionVideoIsUpload,
    },
    {
      tag: "YT#SU82RI83",
      title: "When you subscribe to a new channel",
      service: {
        name: "youtube",
        logoUri: "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png"
      },
      requiresUserAuth: true,
      config: null,
      binding: null,
      function: youtubeAction.actionNewSubscribe,
    },
    {
      tag: "YT#L1K3V1D30",
      title: "When you like a video",
      service: {
        name: "youtube",
        logoUri: "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png"
      },
      requiresUserAuth: true,
      config: null,
      binding: null,
      function: youtubeAction.actionLikedVideo,
    }
  ],
  reactions: [
    {
      tag: "YT#5U82R18E",
      title: "Then subscribe to a given youtuber name",
      service: {
        name: "youtube",
        logoUri: "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png"
      },
      requiresUserAuth: true,
      config: {
        "Youtuber name": {
          type: "text",
          value: "",
        },
      },
      function: youtubeReaction.reactionSubscribeYoutber
    }
  ]
};

module.exports = youtubeService;