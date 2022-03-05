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
    await githubReaction(user.services.github.access_token, 'name', config['New name'].value);
}

async function updateBio(user, area, actionPayload) {
    const { config } = area.reaction;
    await githubReaction(user.services.github.access_token, 'bio', config['New bio'].value);
}

async function updateBlog(user, area, actionPayload) {
    const { config } = area.reaction;
    await githubReaction(user.services.github.access_token, 'blog', config['New blog'].value);
}

async function updateCompagny(user, area, actionPayload) {
    const { config } = area.reaction;
    await githubReaction(user.services.github.access_token, 'compagny', config['New compagny'].value);
}

async function updateLocation(user, area, actionPayload) {
    const { config } = area.reaction;
    await githubReaction(user.services.github.access_token, 'location', config['New location'].value);
}

module.exports = { updateUsername, updateBio, updateBlog, updateLocation, updateCompagny}