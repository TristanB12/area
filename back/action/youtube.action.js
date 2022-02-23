require('dotenv').config();
const db = require('../models');
const axios = require('axios');
const { compareSync } = require('bcryptjs');

const Area = db.area;

/**
 * Get the channelID of the specified Username on Youtube
 * @param {*} username 
 * @param {*} access_token 
 * @returns 
 */
async function getChannelIDByName(username, access_token) {
  const option = {
    url: 'https://youtube.googleapis.com/youtube/v3/channels',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
    params: {
      part: 'snippet,contentDetails,statistics',
      forUsername: username
    }
  };

  const response = await axios(option);

  if (response.data.pageInfo.totalResults === 0)
    return undefined;

  return response.data.items[0].id;
}

/**
 * Get the lastest video posted by the specified Username
 * @param {*} username 
 * @param {*} access_token 
 * @returns 
 */
async function getLatestVideoUploadFrom(username, access_token) {
  const channelId = await getChannelIDByName(username, access_token);

  if (channelId === undefined)
    return undefined;

  const option = {
    url: 'https://youtube.googleapis.com/youtube/v3/activities',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
    params: {
      part: 'snippet,contentDetails',
      channelId,
      maxResults: 1
    }
  };

  const response = await axios(option);

  if (response.data.pageInfo.totalResults === 0)
    return undefined;
  return response.data.items[0];
}

async function actionVideoIsUpload(user, area) {
  const { action } = area;
  const response = await getLatestVideoUploadFrom(action.config.username, user.services.google.access_token);
  const { latestVideoID } = action.save;

  if (response === undefined)
    return { error: true, message: 'Problem with the given Username.' };
  if (response.id === latestVideoID)
    return { error: false, data: false };
  let msave = action.save;
  action.save.latestVideoID = response.id;

  await Area.findByIdAndUpdate({ _id: area._id }, { 'action.save': msave });
  return { error: false, data: response};
}

module.exports = { actionVideoIsUpload };