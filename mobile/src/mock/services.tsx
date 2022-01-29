import { Service } from "../types"

const servicesMock: Service[] = [
  {
    name: "Snapchat",
    logoUri: "https://upload.wikimedia.org/wikipedia/fr/archive/a/ad/20190808214526%21Logo-Snapchat.png",
    isAuth: false,
    actions: [
    ],
    reactions: [
    ]
  },
  {
    name: "Reddit",
    logoUri: "https://toppng.com/uploads/preview/reddit-icon-reddit-logo-transparent-115628752708pqmsy4kgm.png",
    isAuth: false,
    actions: [
    ],
    reactions: [
    ]
  },
  {
    name: "Spotify",
    logoUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
    isAuth: false,
    actions: [
      {
        title: "When an artist releases a new song",
        requiresUserAuth: false
      }
    ],
    reactions: [
      {
        title: "Add to playlist",
        requiresUserAuth: true
      }
    ]
  },
  {
    name: "Gmail",
    logoUri: "https://logodownload.org/wp-content/uploads/2018/03/gmail-logo-16.png",
    isAuth: false,
    actions: [
    ],
    reactions: [
    ]
  },
  {
    name: "Youtube",
    logoUri: "https://www.pngkit.com/png/detail/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png",
    isAuth: false,
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
        requiresUserAuth: false
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
    isAuth: false,
    actions: [
    ],
    reactions: [
      {
        title: "Send an email",
        requiresUserAuth: true
      }
    ]
  },
  {
    name: "Twitter",
    logoUri: "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/2518px-Twitter_Bird.svg.png",
    isAuth: false,
    actions: [
    ],
    reactions: [
    ]
  },
  {
    name: "Twitch",
    logoUri: "http://assets.stickpng.com/images/580b57fcd9996e24bc43c540.png",
    isAuth: false,
    actions: [
    ],
    reactions: [
    ]
  },
]

export default servicesMock