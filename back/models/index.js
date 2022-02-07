const mongoose = require('mongoose');

const db = {};

mongoose.Promise = global.Promise;
db.mongoose = mongoose;
db.user = require('./user.model')(mongoose);

module.exports = db;