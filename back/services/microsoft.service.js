const microsoft = require('../controllers/microsoft.controller');

const microsoftService = {
  tags: ["link"],

  link: {
    accessTokenUrlOption: microsoft.accessTokenUrlOption,
    refreshToken: undefined,
    desactive: microsoft.unlink,
  },
};

module.exports = microsoftService;