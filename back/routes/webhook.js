require('dotenv').config();
var router = require('express').Router();
const webhookController = require('../controllers/webhook.controller');

router.get('/', async (req, res) => {
    const { hash } = req.query;

    if (!hash)
        return res.status(401).json({message: "Not authorized"});
    if (hash !== process.env.HASH)
        return res.status(401).json({message: "Not authorized"});
    await webhookController.runAllWebhook();
    return res.status(200).json({message: "All weebhook process with success." });
});

module.exports = router;