import Area from "../types"

const areas: Area[] = [
  {
    title: "Song from youtube to Spotify",
    description: "Transfer songs I watch from youtube to a Spotify playlist",
    action: {
      service: "Youtube",
      logoUri: "https://www.pngkit.com/png/detail/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png",
      title: "When I watch a song's official video"
    },
    reaction: {
      service: "Spotify",
      logoUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
      title: "Add to playlist",
      config: {
        playlistName: "Gacha"
      }
    }
  },
  {
    title: "Song from Spotify to youtube",
    description: "Transfer songs I listen from spotify to a youtube playlist",
    action: {
      service: "Spotify",
      logoUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
      title: "When I listen to a song"
    },
    reaction: {
      service: "Youtube",
      logoUri: "https://www.pngkit.com/png/detail/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png",
      title: "Add to playlist",
      config: {
        playlistName: "Gacha-Youtube"
      }
    }
  },
  {
    title: "Send me an email when Lil Nas X releases new Song on spotify",
    description: "",
    action: {
      service: "Spotify",
      logoUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
      title: "When an artist releases a new song",
      config: {
        artistName: "Lil Nas X"
      }
    },
    reaction: {
      service: "Outlook",
      logoUri: "https://pnggrid.com/wp-content/uploads/2021/07/Microsoft-Outlook-Logo.png",
      title: "Send an email",
      config: {
        receiver: "julien.pause@epitech.eu"
      }
    }
  },
]

export default areas