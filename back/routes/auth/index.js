var router = require('express').Router();

const authController = require('../../controllers/auth.controller');
const serviceMiddleware = require('../../middleware/service.middleware');

router.post('/signup/:service', serviceMiddleware.getService, authController.signup);
router.post('/signup', serviceMiddleware.getService , authController.signup);

router.post('/login/:service', serviceMiddleware.getService, authController.login);
router.post('/login', serviceMiddleware.getService, authController.login);

module.exports = router;