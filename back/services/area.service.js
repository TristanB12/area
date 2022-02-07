const area = require('../controllers/area.controller');

const areaService = {
    tags: ["auth"],
    auth: {
        login: area.login,
        signup: area.signup
    }
};

module.exports = areaService;