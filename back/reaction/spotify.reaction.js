require('dotenv').config();
const axios = require('axios');

async function getArtistIdFromUsername(artistName, accessToken) {
    const config = {
        method: 'get',
        url: 'https://api.spotify.com/v1/search',
        headers: { 
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            type: 'artist',
            q: artistName
        }
    }

    const response = await axios(config);
    console.log(response.data);
    return response.data?.artists.items[0].id;
}

async function followArtistById(artistId, accessToken) {
    var data = {
        ids: [
            artistId
        ]
    };
    let config = {
        method: 'put',
        url: 'https://api.spotify.com/v1/me/following?type=artist',
        headers: { 
            'Authorization':`Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        data : data
    };
    await axios(config);
}

async function unfollowArtistById(artistId, accessToken) {
    var data = {
        ids: [
            artistId
        ]
    };
    let config = {
        method: 'delete',
        url: 'https://api.spotify.com/v1/me/following?type=artist',
        headers: { 
            'Authorization':`Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        data : data
    };
    await axios(config);
}

async function reactionFollowArtist(user, area, actionPayload) {
    const { config } = area.reaction;
    const artistId = await getArtistIdFromUsername(config["Artist name"].value, user.services.spotify.access_token); 

    if (!artistId) {
        return;
    }
    await followArtistById(artistId, user.services.spotify.access_token);
}

async function reactionUnfollowArtist(user, area, actionPayload) {
    const { config } = area.reaction;
    const artistId = await getArtistIdFromUsername(config["Artist name"].value, user.services.spotify.access_token); 

    if (!artistId) {
        return;
    }
    await unfollowArtistById(artistId, user.services.spotify.access_token);
}

module.exports = { reactionFollowArtist, reactionUnfollowArtist };