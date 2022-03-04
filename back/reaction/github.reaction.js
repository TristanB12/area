const axios = require('axios');

async function githubReaction(access_token, name, value) {  //name, blog, twitter_username, company, location, bio, email
    let data = {};
    data [name] = value;
    const option = {
        url: 'https://api.github.com/user',
        method: 'PATCH',
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `Bearer ${access_token}`
        },
        data
    };
    await axios(option);
}

async function updateUsername(user, area, actionPayload) {
    const { config } = area.reaction;
    await githubReaction(user.services.github.access_token, 'name', config['new name']);
}

async function updateBio(user, area, actionPayload) {
    const { config } = area.reaction;
    await githubReaction(user.services.github.access_token, 'bio', config['new bio']);
}

async function updateBlog(user, area, actionPayload) {
    const { config } = area.reaction;
    await githubReaction(user.services.github.access_token, 'blog', config['new blog']);
}

async function updateTwitterUsername(user, area, actionPayload) {
    const { config } = area.reaction;
    await githubReaction(user.services.github.access_token, 'twitter_username', config['new twitter username']);
}

async function updateCompagny(user, area, actionPayload) {
    const { config } = area.reaction;
    await githubReaction(user.services.github.access_token, 'compagny', config['new compagny']);
}

async function updateLocation(user, area, actionPayload) {
    const { config } = area.reaction;
    await githubReaction(user.services.github.access_token, 'location', config['new location']);
}

async function updateEmail(user, area, actionPayload) {
    const { config } = area.reaction;
    await githubReaction(user.services.github.access_token, 'email', config['new email']);
}

module.exports = { updateUsername, updateBio, updateTwitterUsername, updateBlog, updateLocation, updateCompagny, updateEmail}