const facebook = require('../controllers/facebook.controller');

const facebookService = {
  tag: ["auth"],
  auth: {
    signup: facebook.signup,
    login: facebook.login
  }
};

module.exports = facebookService;