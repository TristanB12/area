const services = require('../services');

function getAllActionsOfService(service) {
  let actions = [];

  if (!service.tags.includes('actions'))
    return actions;

  for (let j = 0; j < service.actions.length; j++)
    actions.push({
      service: service.actions[j].service,
      tag: service.actions[j].tag,
      title: service.actions[j].title,
      requiresUserAuth: service.actions[j].requiresUserAuth,
      config: service.actions[j].config
    });
  return actions;
}

function getAllReactionsOfService(service) {
  let reactions = [];

  if (!service.tags.includes('reactions'))
    return reactions;
  for (let j = 0; j < service.reactions.length; j++)
    reactions.push({
      service: service.reactions[j].service,
      tag: service.reactions[j].tag,
      title: service.reactions[j].title,
      requiresUserAuth: service.reactions[j].requiresUserAuth,
      config: service.reactions[j].config
    });
  return reactions;
}

function getLink(service, platform) {
  const serviceAuthRef = services[service.authRef];

  if (!service.tags.includes('link') && serviceAuthRef.tags.includes('link'))
    return null;
  if (service.tags.includes('link'))
    return {
      clientID: service.links.clientID[platform],
      redirectUri: service.links.redirectUri[platform],
      scope: service.links.scope,
      authorizationEndpoint: service.links.authorizationEndpoint,
    };
  return {
    clientID: serviceAuthRef.links.clientID[platform],
    redirectUri: serviceAuthRef.links.redirectUri[platform],
    scope: serviceAuthRef.links.scope,
    authorizationEndpoint: serviceAuthRef.links.authorizationEndpoint,
  };
}

function getServicesRepr(user, platform) {
  const serviceNames = Object.keys(services);
  let reprServices = [];

  for (let i = 0; i < serviceNames.length; i++) {
    const service = services[serviceNames[i]];
    const actions = getAllActionsOfService(service);
    const reactions = getAllReactionsOfService(service);

    reprServices.push({
      tags: service.tags,
      name: serviceNames[i],
      logoUri: service.logoUri,
      link: getLink(service, platform),
      isLinked: user ? Object.keys(user.services).includes(service.authRef) : undefined,
      actions,
      reactions
    });
  }
  return reprServices;
}

function getServices(req, res) {
  const { user, platform } = req;

  return res.status(200).json(getServicesRepr(user, platform));
}

module.exports = { getServices };