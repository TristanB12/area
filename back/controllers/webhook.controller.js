const services = require('../services');
const db = require('../models');

const Area = db.area;
const User = db.user;

function getReactionByTag(serviceName, tag) {
  const service = services[serviceName];

  try {
    for (let i = 0; i < service.reactions.length; i++) {
      if (service.reactions[i].tag === tag)
        return service.reactions[i];
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
}

async function doActionAndReaction(confAction, user, area) {
  const responce = await confAction.function(user, area);

  if (responce.error) {
    console.log(responce.message);
    return false; // Problem with config in action
  }

  if (!responce.data)
    return false; // The webhook is not trigger

  console.log(`TRIGGER: ${confAction.tag}`);

  const confReaction = getReactionByTag(area.reaction.service.name, area.reaction.tag);
  const serviceName = confReaction.service.name;
  const serviceAuthRef = services[serviceName].authRef;
  const platform = user.services[serviceAuthRef].latestPlatformUsed;

  try {
    await confReaction.function(user, area, responce);
    console.log(`REACTION: ${confReaction.tag}`);
  } catch (error) {
    if (!confReaction.requiresUserAuth || !services[confReaction.service.name].refreshToken) {
      return true;
    }
    const link = {
      platform,
      clientID: services[serviceAuthRef].links.clientID[platform],
      redirectUri: services[serviceAuthRef].links.redirectUri[platform],
      clientSecret: services[serviceAuthRef].links.clientSecret[platform],
      scope: services[serviceAuthRef].links.scope
    };
    await services[serviceName].refreshToken(user, link);
    user = await User.findById(area.owner);
    try {
      await confReaction.function(user, area, responce);
      console.log(`REACTION: ${confReaction.tag}`);
    } catch (error) {
      console.log(error);
    }
  }
  return true;
}

function getActionByTag(serviceName, tag) {
  const service = services[serviceName];

  try {
    for (let i = 0; i < service.actions.length; i++) {
      if (service.actions[i].tag === tag)
        return service.actions[i];
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
}

async function webhookByTag(serviceName, tag) {
  const service = services[serviceName];
  const confAction = getActionByTag(serviceName, tag);
  const areas = await Area.find({ 'action.tag': tag });

  for (let i = 0; i < areas.length; i++) {
    let user = await User.findById(areas[i].owner);

    try {

      await doActionAndReaction(confAction, user, areas[i]);

    } catch (error) {
      if (!confAction.requiresUserAuth || !service.refreshToken)
        continue;

      // Try to refresh_token
      const serviceAuthRef = services[serviceName].authRef;
      const platform = user.services[serviceAuthRef].latestPlatformUsed;
      await service.refreshToken(user, {
        platform,
        clientID: services[serviceAuthRef].links.clientID[platform],
        redirectUri: services[serviceAuthRef].links.redirectUri[platform],
        clientSecret: services[serviceAuthRef].links.clientSecret[platform],
        scope: services[serviceAuthRef].links.scope
      });
      user = await User.findById(areas[i].owner);

      try {
        await doActionAndReaction(confAction, user, areas[i]);
      } catch (err) {
        console.log(err);
        // TODO: refresh the access_token doesn't work
      }
    }
  }
}

async function webhookByService(serviceName) {
  const service = services[serviceName];

  if (service == undefined)
    return
  if (!service.tags.includes('actions'))
    return;
  for (let i = 0; i < service.actions.length; i++) {
    const tag = service.actions[i].tag;
    await webhookByTag(serviceName, tag);
  }
}

module.exports = { webhookByTag, webhookByService };