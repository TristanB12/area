module.exports = [
    {
        name: "Snapchat",
        logoUri: "https://upload.wikimedia.org/wikipedia/fr/archive/a/ad/20190808214526%21Logo-Snapchat.png",
        isLinked: true,
        actions: [
            {
                title: "New snap received",
                requiresUserAuth: true
            },
            {
                title: "New chat message received",
                requiresUserAuth: true
            },
            {
                title: "New friend request received",
                requiresUserAuth: true
            },
            {
                title: "New followed friend story",
                requiresUserAuth: true
            },
        ],
        reactions: [
            {
                title: "Send chat message",
                requiresUserAuth: true
            }
        ]
    },
    {
        name: "Reddit",
        logoUri: "https://toppng.com/uploads/preview/reddit-icon-reddit-logo-transparent-115628752708pqmsy4kgm.png",
        isLinked: false,
        actions: [
            {
                title: "New subreddit post",
                requiresUserAuth: false
            },
            {
                title: "New private message",
                requiresUserAuth: true
            }
        ],
        reactions: [
            {
                title: "Send private message",
                requiresUserAuth: true
            },
            {
                title: "Post comment",
                requiresUserAuth: true
            }
        ]
    },
    {
        name: "Spotify",
        logoUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
        isLinked: false,
        actions: [
            {
                title: "When an artist releases a new song",
                requiresUserAuth: false
            },
            {
                title: "New track added to playlist",
                requiresUserAuth: true
            },
            {
                title: "New saved track",
                requiresUserAuth: true
            },
            {
                title: "New recently played track",
                requiresUserAuth: true
            },
            
        ],
        reactions: [
            {
                title: "Add to playlist",
                requiresUserAuth: true
            },
            {
                title: "Pause current track",
                requiresUserAuth: true
            }
        ]
    },
    {
        name: "Gmail",
        logoUri: "https://logodownload.org/wp-content/uploads/2018/03/gmail-logo-16.png",
        isLinked: true,
        actions: [
            {
                title: "New email received",
                requiresUserAuth: true
            }
        ],
        reactions: [
            {
                title: "Send email",
                requiresUserAuth: true
            }
        ]
    },
    {
        name: "Youtube",
        logoUri: "https://www.pngkit.com/png/detail/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png",
        isLinked: true,
        actions: [
            {
                title: "When I watch a song's official video",
                requiresUserAuth: false
            },
            {
                title: "When I upload new video",
                requiresUserAuth: true
            },
            {
                title: "When a youtuber reaches a certain amount of subscribers",
                requiresUserAuth: false,
                config: {
                    "Youtuber name": {
                        type: "text",
                        value: "",
                    },
                    "Number of subscribers": {
                        type: "number",
                        value: "",
                    },
                },
            },
        ],
        reactions: [
            {
                title: "Add to playlist",
                requiresUserAuth: true
            }
        ]
    },
    {
        name: "Outlook",
        logoUri: "https://pnggrid.com/wp-content/uploads/2021/07/Microsoft-Outlook-Logo.png",
        isLinked: false,
        actions: [
            {
                title: "New email received",
                requiresUserAuth: true
            }
        ],
        reactions: [
            {
                title: "Send email",
                requiresUserAuth: true
            }
        ]
    },
    {
        name: "Twitter",
        logoUri: "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/2518px-Twitter_Bird.svg.png",
        isLinked: false,
        actions: [
            {
                title: "New private message received",
                requiresUserAuth: true
            }
        ],
        reactions: [
            {
                title: "Post a tweet",
                requiresUserAuth: true
            }
        ]
    },
    {
        name: "Twitch",
        logoUri: "https://www.pngplay.com/wp-content/uploads/12/Twitch-Logo-PNG-Clip-Art-HD-Quality.png",
        isLinked: true,
        actions: [
            {
                title: "Followed streamer went live",
                requiresUserAuth: true
            }
        ],
        reactions: [
            {
                title: "Subscribe to a streamer",
                requiresUserAuth: true,
                config: {
                    "Streamer name": {
                        type: "text",
                        value: "",
                    }
                }
            }
        ]
    },
]