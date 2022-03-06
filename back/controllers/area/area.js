require('dotenv').config();

const services = require('../../services');
const db = require("../../models");
const Area = db.area;

/**
 * Get all the area of specific user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getAllArea(req, res) {
  const { user } = req;
  const areas = await Area.find({ owner: user._id });

  return res.status(200).json({
    items: Object.keys(areas).length,
    data: areas
  });
}

/**
 * Get a config of certain action by is tag
 * @param {*} serviceName 
 * @param {*} tag 
 * @returns 
 */
function getActionByTag(serviceName, tag) {
  const service = services[serviceName];

  console.log(serviceName);

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

/**
 * Create an area with given params
 * @param {*} req 
 * @param {*} res 
 */
async function createArea(req, res) {
  const { user } = req;
  let { action, reaction, title, description } = req.body;

  if (!action)
    return res.status(400).json({ message: 'missing action field in request.' });
  if (!reaction)
    return res.status(400).json({ message: 'missing reaction field in request.' });
  const configAction = getActionByTag(action.service, action.tag);
  if (!configAction)
    return res.status(400).json({ message: `specified action does not exist or not supported by ${action.service} service.` });
  const configReaction = getReactionByTag(reaction.service, reaction.tag);
    if (!configReaction)
      return res.status(400).json({ message: `specified reaction does not exist or not supported by ${reaction.service} service.` });
  
  if (!title)
    title = `${configAction.title},${configReaction.title}`;

  const area = await Area.create({
    owner: user._id,
    title,
    description,
    action: {
      tag: configAction.tag,
      service: configAction.service,
      title: configAction.title,
      requiresUserAuth: configAction.requiresUserAuth,
      config: action.config,
      save: {
        _v: 0
      }
    },
    reaction: {
      tag: configReaction.tag,
      service: configReaction.service,
      title: configReaction.title,
      requiresUserAuth: configReaction.requiresUserAuth,
      config: reaction.config,
      save: {
        _v: 0
      }
    },
  });

  return res.status(200).json({
    message: "Area successfully created.",
    area
  });
}

/**
 * Delete specific area
 * @param {*} req 
 * @param {*} res 
 */
async function deleteArea(req, res) {
  const id = req.params.id || req.query.id;

  if (!id)
    return res.status(400).json({ message: "id must be specified in request." });
  Area.findByIdAndDelete(id, (err) => {
    if (err)
      return res.status(405).json({ message: err.message || "can't delete this area." })
    return res.status(200).json({ message: "area successfully deleted." });
  });
}

async function updateArea(req, res) {
  const id = req.params.id || req.query.id;
  let { action, reaction, title, description } = req.body;

  if (!action)
    return res.status(400).json({ message: 'missing action field in request.' });
  if (!reaction)
    return res.status(400).json({ message: 'missing reaction field in request.' });
  const configAction = getActionByTag(action.service, action.tag);
  if (!configAction)
    return res.status(400).json({ message: `specified action does not exist or not supported by ${action.service} service.` });
  const configReaction = getReactionByTag(reaction.service, reaction.tag);
    if (!configReaction)
      return res.status(400).json({ message: `specified reaction does not exist or not supported by ${reaction.service} service.` });
  
  if (!title)
    title = `${configAction.title},${configReaction.title}`;
  try {
    await Area.findByIdAndUpdate({ _id: id }, {
      titletitle,
      description,
      action,
      reaction,
    });
    const area = await Area.findById(id);
    return res.status(200).json( { message: "area successfully updated.", area});
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ID area specified doesn't exist."});
  } 
}

module.exports = { getAllArea, createArea, deleteArea, updateArea };