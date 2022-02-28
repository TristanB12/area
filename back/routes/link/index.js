var router = require('express').Router();

const tokenMiddleWare = require('../../middleware/token.middleware');

const linkController = require('../../controllers/link.controller');
const serviceMiddleware = require('../../middleware/service.middleware');

router.post('/:service', tokenMiddleWare.verifyAccessToken, serviceMiddleware.getService, linkController.linkService );
router.post('/', tokenMiddleWare.verifyAccessToken, serviceMiddleware.getService, linkController.linkService);

router.delete('/:service', tokenMiddleWare.verifyAccessToken, serviceMiddleware.getService, linkController.unlinkService);
router.delete('/', tokenMiddleWare.verifyAccessToken, serviceMiddleware.getService, linkController.unlinkService);

module.exports = router;