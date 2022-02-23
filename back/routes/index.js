module.exports = app => {
  app.get('/', async (req, res) => {

    return res.status(200).json({ message: "Hello Wolrd" });
  });

  app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

  app.use('/auth', require('./auth'));
  app.use('/token', require('./token'));
  app.use('/link', require('./link'));
  app.use('/user', require('./user'));
  app.use('/area', require('./area'));

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page not found.' });
  });
};