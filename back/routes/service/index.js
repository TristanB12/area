var router = require('express').Router();

const tokenMiddleWare = require('../../middleware/token.middleware');
const serviceController = require('../../controllers/service.controller');

router.get('/', tokenMiddleWare.verifyAccessToken, serviceController.getServices);

module.exports = router;