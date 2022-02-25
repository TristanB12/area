var router = require('express').Router();
const services = require('../services');

router.get('/', async (req, res) => {
  let service_names = Object.keys(services);
  let mservices = [];

  for (let i = 0; i < service_names.length; i++) {
    let actions = [];
    let reactions = [];

    if (services[service_names[i]].tags.includes('actions')) {
      for (let j = 0; j < services[service_names[i]].actions.length; j++) {
        actions.push({
          name: services[service_names[i]].actions[j].tag,
          description: services[service_names[i]].actions[j].title
        });
      }
    }

    if (services[service_names[i]].tags.includes('reactions')) {
      for (let j = 0; j < services[service_names[i]].reactions.length; j++) {
        reactions.push({
          name: services[service_names[i]].reactions[j].tag,
          description: services[service_names[i]].reactions[j].title
        });
      }
    }

    mservices.push({
      name: service_names[i],
      actions,
      reactions,
    })
  }
  return res.status(200).json({
    client: {
      host: req.socket.remoteAddress
    },
    server: {
      current_time: parseInt(new Date().getTime() / 1000),
      services: mservices
    }
  });
});

module.exports = router;