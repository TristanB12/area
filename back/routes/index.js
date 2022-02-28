const webhookController = require('../controllers/webhook.controller');

module.exports = app => {
  app.use('/about.json', require('./about'))
  app.use('/auth', require('./auth'));
  app.use('/token', require('./token'));
  app.use('/link', require('./link'));
  app.use('/user', require('./user'));
  app.use('/area', require('./area'));
  app.use('/service', require('./service'));
  app.get('/test', async (req, res) => {
    await webhookController.webhookByService('youtube');
    return res.status(200).send('ok');
  })
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page not found.' });
  });
};