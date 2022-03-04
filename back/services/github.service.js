require('dotenv').config();
const githubReaction = require('../reaction/github.reaction.js')
const github = require('../controllers/github.controller');

const githubService = {
    tags: ["link", "reactions"],
    authRef: "github",
    logoUri: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
    link: {
        accessTokenUrlOption: github.accessTokenUrlOption,
        desactive: github.unlink
    },
    links: {
        clientID: {
            web: process.env.GITHUB,
            ios: process.env.GITHUB_CLIENT_ID_IOS,
            android: process.env.GITHUB_CLIENT_ID_ANDROID,
            dev: process.env.GITHUB_CLIENT_ID_WEB,
        },
        redirectUri: {
        web: process.env.GITHUB_REDIRECT_URI_WEB,
        ios: process.env.GITHUB_REDIRECT_URI_IOS,
        android: process.env.GITHUB_REDIRECT_URI_ANDROID,
        dev: process.env.GITHUB_REDIRECT_URI_DEV,
        },
        clientSecret: {
            web: process.env.GITHUB_CLIENT_SECRET_WEB,
            ios: process.env.GITHUB_CLIENT_SECRET_IOS,
            android: process.env.GITHUB_CLIENT_SECRET_ANDROID,
            dev: process.env.GITHUB_CLIENT_SECRET_WEB,
        },
        scope: "user-repo",
        authorizationEndpoint: "https://github.com/login/oauth/authorize",
    },
    refreshToken: undefined,
    reactions: [
        {
            tag: "GIT#21",
            title: "Update username github",
            service: {
            name: "github",
            logoUri: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
        },
        requiresUserAuth: true,
        config: {
                "new name": {
                type: 'text',
                value: ""
            }
        },
        function: githubReaction.updateUsername,
    },
    {
        tag: "GIT#22",
        title: "Update bio github",
        service: {
            name: "github",
            logoUri: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
        },
        requiresUserAuth: true,
        config: {
            "new bio": {
                type: 'text',
                value: ""
            }
        },
        function: githubReaction.updateBio,
    },
    {
        tag: "GIT#23",
        title: "Update blog url",
        service: {
            name: "github",
            logoUri: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
        },
        requiresUserAuth: true,
        config: {
            "new blog": {
                type: 'text',
                value: ""
            }
        },
        function: githubReaction.updateBlog,
    },
    {
        tag: "GIT#24",
        title: "Update twitter username",
        service: {
            name: "github",
            logoUri: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
        },
        requiresUserAuth: true,
        config: {
            "new twitter username": {
                type: 'text',
                value: ""
            }
        },
        function: githubReaction.updateTwitterUsername,
    },
    {
        tag: "GIT#25",
        title: "Update compagny",
        service: {
            name: "github",
            logoUri: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
        },
        requiresUserAuth: true,
        config: {
            "new compagny": {
                type: 'text',
                value: ""
            }
        },
        function: githubReaction.updateCompagny,
    },
    {
        tag: "GIT#26",
        title: "Update location",
        service: {
            name: "github",
            logoUri: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
        },
        requiresUserAuth: true,
        config: {
            "new location": {
                type: 'text',
                value: ""
            }
        },
        function: githubReaction.updateLocation,
    },
    {
        tag: "GIT#27",
        title: "Update email",
        service: {
            name: "github",
            logoUri: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
        },
        requiresUserAuth: true,
        config: {
            "new email": {
                type: 'text',
                value: ""
            }
        },
        function: githubReaction.updateEmail,
    }
    ]
};

module.exports = githubService;