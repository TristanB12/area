const areaAuth = require('../controllers/area/auth');

const areaService = {
    tags: ["auth"],
    authRef: 'area',
    auth: {
        login: areaAuth.login,
        signup: areaAuth.signup
    }
};

module.exports = areaService;