require('dotenv').config();
var router = require('express').Router();
const webhookController = require('../controllers/webhook.controller');
const services = require('../services');

router.get('/', async (req, res) => {
    const { hash } = req.query;

    if (!hash)
        return res.status(401).json({message: "Not authorized"});
    if (hash !== process.env.HASH)
        return res.status(401).json({message: "Not authorized"});
    const serviceName = Object.keys(services);
    for (let i = 0; i < serviceName.length; i++) {
        await webhookController.webhookByService(serviceName[i]);
    }
    return res.status(200).json({message: "All weebhook process with success." });
});

module.exports = router;