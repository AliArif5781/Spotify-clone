const env = import.meta.env;
const authEndpoint = env.VITE_AUTHENDPOINT;
const redirect_uri = env.VITE_REDIRECT_URI;
const client_id = env.VITE_CLIENT_ID;
const scope = [
  // in order to perform anything inside sotify app first have scope then only can do that
  "user-read-email",
  "user-read-private",
  "user-read-currently-playing", //
  "user-library-read",
  "playlist-read-private", //////
  "playlist-read-collaborative",
  "app-remote-control", ////////
  "user-read-recently-played", //
  "user-top-read", //
  "user-modify-playback-state", //
  "user-read-playback-state",
  "user-read-playback-position",
  "streaming",
];
export const loginUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
  "%20"
)}&response_type=token&show_dialog=true`;

/*
Here’s the logic behind the Spotify configuration file:

//  The authEndpoint is the URL where we need to authenticate using Spotify. All Spotify Authentication requests must be passed through this URL.
//  The redirectUri is the one which we gave in the Spotify Web API settings, this states where to take back the user if the Spotify login was successful.
//  The clientId is the Client ID provided to you by the Spotify Web API and you need to mention it here.
//  scopes are basically permissions which you need to ask Spotify for. More such permissions are available on Spotify API Documentation.
//  The loginUrl is the final URL which needs to be called in order to authorize an user for our Spotify Clone app. This URL contains the Client ID and all the permissions so that Spotify knows about our app and allows user authentication.
 */
