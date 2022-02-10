var router = require('express').Router();

const tokenMiddleWare = require('../../middleware/token.middleware');
const areaController = require('../../controllers/area.controller');

router.get('/', tokenMiddleWare.verifyAccessToken, areaController.getUserInfos);

module.exports = router;