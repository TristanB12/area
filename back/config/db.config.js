require('dotenv').config()
const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

exports.connect = () => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(`Connected to the database.`);
  }).catch(err => {
    console.log(`Cannot connect to the database.`, err);
    process.exit();
  });
};