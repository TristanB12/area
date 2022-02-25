module.exports = app => {
  app.use('/about.json', require('./about'))
  app.use('/auth', require('./auth'));
  app.use('/token', require('./token'));
  app.use('/link', require('./link'));
  app.use('/user', require('./user'));
  app.use('/area', require('./area'));

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page not found.' });
  });
};