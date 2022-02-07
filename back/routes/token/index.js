var router = require('express').Router();

const tokenController = require('../../controllers/token.controller');
const tokenMiddleWare = require('../../middleware/token.middleware');

router.get('/refresh', tokenMiddleWare.getRefreshToken, tokenController.refreshAreaAccessToken);

router.get('/verify', tokenMiddleWare.verifyAccessToken, tokenController.verifyAreaAccessToken);

module.exports = router;