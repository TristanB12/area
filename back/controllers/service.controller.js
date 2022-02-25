const services = require('../services');

function getServicesRepr() {
    return {};
}

function getServices(req, res) {
    return res.status(200).json(getServicesRepr());
}

module.exports = { getServices };