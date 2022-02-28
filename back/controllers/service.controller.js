const services = require('../services');

function getAllActionsOfService(service) {
    let actions = [];

    if (!service.tags.includes('actions'))
        return actions;
    console.log(service);

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
    for (let j = 0; j < service.reactions; j++)
        reactions.push({
            service: service.reactions[j].service,
            tag: service.reactions[j].tag,
            title: service.reactions[j].title,
            requiresUserAuth: service.reactions[j].requiresUserAuth,
            config: service.reactions[j].config
        });
    return reactions;
}

function getServicesRepr(user) {
    const serviceNames = Object.keys(services);
    let reprServices = [];

    for (let i = 0; i < serviceNames.length; i++) {
        const service = services[serviceNames[i]];
        const actions = getAllActionsOfService(service);
        const reactions = getAllReactionsOfService(service);

        console.log(serviceNames[i]);
        console.log(actions);
        console.log(reactions);
        if (actions.length == 0 && reactions.length == 0)
            continue;
        reprServices.push({
            name: serviceNames[i],
            isLinked: Object.keys(user.services).includes(service.authRef),
            actions,
            reactions
        });
    }
    return reprServices;
}

function getServices(req, res) {
    const { user } = req;
    return res.status(200).json(getServicesRepr(user));
}

module.exports = { getServices };