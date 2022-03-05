const { platform } = require('os');
const qs = require('querystring');

const spotifyAuthCode = (state) => {
    let win = window.open('https://accounts.spotify.com/authorize?' +
    qs.stringify({
        response_type: 'code',
        client_id: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
        scope: 'user-read-private user-read-email user-top-read',
        redirect_uri: process.env.VUE_APP_SPOTIFY_REDIRECT_URI,
        state: state,
    }))
    return win;
}

const googleAuthCode = (state) => {
    let win = window.open('https://accounts.google.com/o/oauth2/v2/auth?' +
    qs.stringify({
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        scope: 'profile email https://www.googleapis.com/auth/youtube https://mail.google.com/',
        redirect_uri: process.env.VUE_APP_GOOGLE_REDIRECT_URI,
        state: state
    }))
    return win;
}

const facebookAuthCode = (state) => {
    let win = window.open('https://www.facebook.com/v12.0/dialog/oauth?' +
    qs.stringify({
        response_type: 'code',
        client_id: process.env.VUE_APP_FACEBOOK_CLIENT_ID,
        scope: 'email,public_profile',
        redirect_uri: process.env.VUE_APP_FACEBOOK_REDIRECT_URI,
        state: state
    }))
    return win;
}

const githubAuthCode = (state) => {
    let win = window.open('https://github.com/login/oauth/authorize?' +
    qs.stringify({
        redirect_uri: process.env.VUE_APP_GITHUB_REDIRECT_URI,
        client_id: process.env.VUE_APP_GITHUB_CLIENT_ID,
        scope: 'user repo',
        state: state,
    }))
    return win;
}

const redditAuthCode = (state) => {
    let win = window.open('https://www.reddit.com/api/v1/authorize' + 
    qs.stringify({
        redirect_uri: process.env.VUE_APP_REDDIT_REDIRECT_URI,
        client_id: process.env.VUE_APP_REDDIT_CLIENT_ID,
        response_type: 'code',
        scope: "identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread",
        state: state
    }))
    return win;
}

const twitchAuthCode = (state) => {
    let win = window.open('https://id.twitch.tv/oauth2/authorize?' +
    qs.stringify({
        client_id: process.env.VUE_APP_TWITCH_CLIENT_ID,
        redirect_uri: process.env.VUE_APP_TWITCH_REDIRECT_URI,
        response_type: 'code',
        scope: 'user:read:follows',
        state: state,
    }))
    return win;
}

const functionsTable = {
    "spotify": spotifyAuthCode,
    "facebook": facebookAuthCode,
    "twitch": twitchAuthCode,
    "github": githubAuthCode,
    "google": googleAuthCode,
    "youtube": googleAuthCode,
    "gmail": googleAuthCode,
    "reddit": redditAuthCode,
}

module.exports = {
    spotifyAuthCode,
    facebookAuthCode,
    twitchAuthCode,
    githubAuthCode,
    googleAuthCode,
    functionsTable
}