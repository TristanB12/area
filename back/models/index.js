const mongoose = require('mongoose');

const db = {};

mongoose.Promise = global.Promise;
db.mongoose = mongoose;
db.user = require('./user.model')(mongoose);
db.area = require('./area.model')(mongoose);

module.exports = db;