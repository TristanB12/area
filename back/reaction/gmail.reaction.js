const axios = require('axios');
const gmailAction = require('../action/gmail.action');

async function sendEmail(access_token, from, config) {
  const message = `From: <${from}>
To: <${config['To email'].value}>
Subject: ${config.Subject.value}

${config.Content.value}`;
  const option = {
    url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
    data: {
      raw: Buffer.from(message).toString('base64').replace('+', '-').replace('/', '_')
    }
  };

  console.log(option);
  console.log(message);
  const responce = await axios(option);
  console.log(responce.data);
}

async function reactionSendEmail(user, area, actionPlayload) {
  const { config } = area.reaction;
  const profile = await gmailAction.getUserProfile(user.services.google.access_token);

  try {
    await sendEmail(user.services.google.access_token, profile.emailAddress, config);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { reactionSendEmail };