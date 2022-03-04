const axios = require('axios');
const youtubeAction = require('../action/youtube.action');

async function subscribeYoutuber(channelId, access_token) {
  const option = {
    url: 'https://youtube.googleapis.com/youtube/v3/subscriptions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
    params: {
      part: 'snippet'
    },
    data: {
      snippet: {
        resourceId: {
          kind: "youtube#channel",
          channelId
        }
      }
    }
  };

  await axios(option);
}

async function reactionSubscribeYoutber(user, area, actionPlayload) {
  const { config } = area.reaction;
  const channelId = await youtubeAction.getChannelIDByName(config["Youtuber name"].value, user.services.google.access_token);

  if (!channelId)
    return;
  await subscribeYoutuber(channelId, user.services.google.access_token);
}

module.exports = { reactionSubscribeYoutber };