const areaService =  require('./area.service');
const facebookService = require('./facebook.service');
const gmailService = require('./gmail.service');
const googleService = require('./google.service');
const microsoftService = require('./microsoft.service');
const redditService = require('./reddit');
const spotifyService = require('./spotify.service');
const youtubeService = require('./youtube.service');

const services = {
    "area": areaService,
    "spotify": spotifyService,
    "google": googleService,
    "youtube": youtubeService,
    "microsoft": microsoftService,
    "facebook": facebookService,
    "gmail": gmailService,
    "reddit": redditService
};

module.exports = services;