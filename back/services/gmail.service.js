const google = require('../controllers/google.controller');
const gmailReaction = require('../reaction/gmail.reaction');

const gmailService = {
  tags: ["reactions"],
  authRef: 'google',
  logoUri: null,
  refreshtoken: google.refreshAccessToken,
  reactions: [
    {
      tag: "GM#53NDM41L",
      title: "Then send an email.",
      service: {
        name: "gmail",
        logoUri: null,
      },
      requiresUserAuth: true,
      config: {
        "To email": {
          type: "text",
          value: "",
        },
        "Subject": {
          type: "text",
          value: "",
        },
        Content: {
          type: "text",
          value: ""
        }
      },
      binding: {},
      function: gmailReaction.reactionSendEmail,
    }
  ]
};

module.exports = gmailService;