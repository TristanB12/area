const router = require('express').Router();

const areaController = require('../../controllers/area.controller');
const tokenMiddleware = require('../../middleware/token.middleware');

router.get('/', tokenMiddleware.verifyAccessToken, areaController.getAllArea);

router.post('/', tokenMiddleware.verifyAccessToken, areaController.createArea);

router.delete('/:id', tokenMiddleware.verifyAccessToken, areaController.deleteArea);
router.delete('/', tokenMiddleware.verifyAccessToken, areaController.deleteArea);

module.exports = router;