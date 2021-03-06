const router = require('express').Router();

const area = require('../../controllers/area/area');
const tokenMiddleware = require('../../middleware/token.middleware');

router.get('/', tokenMiddleware.verifyAccessToken, area.getAllArea);

router.post('/', tokenMiddleware.verifyAccessToken, area.createArea);

router.patch('/:id', tokenMiddleware.verifyAccessToken, area.updateArea);
router.patch('/', tokenMiddleware.verifyAccessToken, area.updateArea);

router.delete('/:id', tokenMiddleware.verifyAccessToken, area.deleteArea);
router.delete('/', tokenMiddleware.verifyAccessToken, area.deleteArea);

module.exports = router;