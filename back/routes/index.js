module.exports = app => {
  app.get('/', async (req, res) => {

    return res.status(200).json({ message: "Hello Wolrd" });
  });

  app.use('/auth', require('./auth'));
  app.use('/token', require('./token'));
  app.use('/link', require('./link'));
  app.use('/user', require('./user'));

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page not found.' });
  });
};