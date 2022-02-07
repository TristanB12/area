var express = require('express');
const db = require('../models');

module.exports = app => {
  app.get('/', async (req, res) => {
    const data = await db.user.find();

    return res.status(200).json(data);
  });

  app.use('/auth', require('./auth'));
  app.use('/token', require('./token'));
  app.use('/link', require('./link'));

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page not found.' });
  });
};