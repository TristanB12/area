const microsoft = require('../controllers/microsoft.controller');

const microsoftService = {
  tags: ["link"],
  authRef: 'microsoft',
  link: {
    accessTokenUrlOption: microsoft.accessTokenUrlOption,
    desactive: microsoft.unlink,
  },
  refreshToken: undefined,
};

module.exports = microsoftService;