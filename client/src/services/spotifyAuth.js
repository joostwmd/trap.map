  const authEndpoint = "https://accounts.spotify.com/authorize";
  const redirectUri = "http://localhost:3000/callback/";
  const clientId = "25ecacddc59e4a3aadede77c0f93cf43";

  const scopes = [
    "streaming",
    "playlist-modify-public",
    "playlist-read-private",
    "user-follow-modify",
    "user-follow-read",
    "ugc-image-upload",
    "user-read-email",
    "user-read-private",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-modify-playback-state"
  ];

  export const spotifyAuthUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20")}&response_type=code&show_dialog=true`;



