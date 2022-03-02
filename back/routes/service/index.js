var router = require('express').Router();

const tokenMiddleWare = require('../../middleware/token.middleware');
const serviceController = require('../../controllers/service.controller');
const platformMiddleware = require('../../middleware/platform.middleware');

router.get('/', tokenMiddleWare.verifyAccessToken, platformMiddleware.getPlatform, serviceController.getServices);
router.get('/offline', platformMiddleware.getPlatform, serviceController.getServices);

module.exports = router;