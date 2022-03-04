const db = require('../models');
const axios = require('axios');
const User = db.user;

function accessTokenUrlOption(code, link) {
    return {};
}

async function refreshAccessToken(user, link) {
    return true;
}

async function unlink(req, res) {
    return {};
}

module.exports = { refreshAccessToken, accessTokenUrlOption, unlink };