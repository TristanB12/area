const areaService =  require('./area.service');
const facebookService = require('./facebook.service');
const googleService = require('./google.service');
const microsoftService = require('./microsoft.service');
const snapchatService = require('./snapchat.service');
const spotifyService = require('./spotify.service');
const youtubeService = require('./youtube.service');

const services = {
    "area": areaService,
    "spotify": spotifyService,
    "google": googleService,
    "youtube": youtubeService,
    "microsoft": microsoftService,
    "facebook": facebookService,
    // "snapchat":snapchatService TODO: Re-try Snapchat API (problem with oauth2)
};

module.exports = services;