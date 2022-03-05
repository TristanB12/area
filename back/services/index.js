const areaService =  require('./area.service');
const facebookService = require('./facebook.service');
const githubService = require('./github.service');
const gmailService = require('./gmail.service');
const googleService = require('./google.service');
const microsoftService = require('./microsoft.service');
const redditService = require('./reddit');
const spotifyService = require('./spotify.service');
const youtubeService = require('./youtube.service');
const twitchServices = require('./twitch.service');

const services = {
    "area": areaService,
    "spotify": spotifyService,
    "google": googleService,
    "youtube": youtubeService,
    "microsoft": microsoftService,
    "facebook": facebookService,
    "gmail": gmailService,
    "reddit": redditService,
    "github": githubService,
    "twitch": twitchServices
};

module.exports = services;