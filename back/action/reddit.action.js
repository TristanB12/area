const db = require('../models');
const axios = require('axios');

const Area = db.area;

async function getUserInformation(access_token) {
  const option = {
    url: 'https://oauth.reddit.com/api/v1/me',
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  };

  const res = await axios(option);
  return res.data;
}

async function actionSubscribeToMe(user, area) {
  const { action } = area;
  const response = await getUserInformation(user.services.reddit.access_token);
  const { subscribers } = action.save;

  if (subscribers === response.subreddit.subscribers)
    return { error: false, data: false };
  let msave = action.save;
  msave.subscribers = response.subreddit.subscribers;
  await Area.findByIdAndUpdate({ _id: area._id }, { 'action.save': msave });
  if (subscribers === undefined || subscribers > msave.subscribers)
    return { error: false, data: false };
  return { error: false, data: true };
}

module.exports = { actionSubscribeToMe };