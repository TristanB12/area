var router = require('express').Router();

const tokenMiddleWare = require('../../middleware/token.middleware');
const areaUser = require('../../controllers/area/user');

router.get('/', tokenMiddleWare.verifyAccessToken, areaUser.getInfos);

module.exports = router;