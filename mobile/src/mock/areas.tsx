import Area from "../types"

const areasMock: Area[] = [
  {
    _id: 1424242232,
    title: "Song from youtube to Spotify",
    description: "Transfer songs I watch from youtube to a Spotify playlist",
    action: {
      service: {
        name: "Youtube",
        logoUri: "https://www.pngkit.com/png/detail/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png",
      },
      title: "When I watch a song's official video",
      requiresUserAuth: false
    },
    reaction: {
      service: {
        name: "Spotify",
        logoUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
      },
      title: "Add to playlist",
      requiresUserAuth: false,
    }
  },
  {
    _id: 23232432424,
    title: "Song from Spotify to youtube",
    description: "Transfer songs I listen from spotify to a youtube playlist",
    action: {
      service: {
        name: "Spotify",
        logoUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
      },
      title: "When I listen to a song",
      requiresUserAuth: false
    },
    reaction: {
      service: {
        name: "Youtube",
        logoUri: "https://www.pngkit.com/png/detail/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png",
      },
      title: "Add to playlist",
      requiresUserAuth: false,
    }
  },
  {
    _id: 322472748,
    title: "Send me an email when Lil Nas X releases new Song on spotify",
    description: "",
    action: {
      service: {
        name: "Spotify",
        logoUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
      },
      title: "When an artist releases a new song on Spotify and I'm subscribed to that artist",
      requiresUserAuth: false,
    },
    reaction: {
      service: {
        name: "Outlook",
        logoUri: "https://pnggrid.com/wp-content/uploads/2021/07/Microsoft-Outlook-Logo.png",
      },
      title: "Send an email",
      requiresUserAuth: false
    }
  },
]

export default areasMock