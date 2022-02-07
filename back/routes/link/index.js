var router = require('express').Router();

const tokenMiddleWare = require('../../middleware/token.middleware');

const linkController = require('../../controllers/link.controller');
const serviceMiddleware = require('../../middleware/service.middleware');

router.get('/:service', tokenMiddleWare.verifyAccessToken, serviceMiddleware.getService, linkController.linkService );
router.get('/', tokenMiddleWare.verifyAccessToken, serviceMiddleware.getService, linkController.linkService);

module.exports = router;