var router = require('express').Router();

const authController = require('../../controllers/auth.controller');
const serviceMiddleware = require('../../middleware/service.middleware');
const platformMiddleware = require('../../middleware/platform.middleware');

router.post('/signup/:service', serviceMiddleware.getService, platformMiddleware.getPlatform, authController.signup);
router.post('/signup', serviceMiddleware.getService , platformMiddleware.getPlatform, authController.signup);

router.post('/login/:service', serviceMiddleware.getService, platformMiddleware.getPlatform, authController.login);
router.post('/login', serviceMiddleware.getService, platformMiddleware.getPlatform, authController.login);

module.exports = router;