require('dotenv').config();

const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const generateRandomString = require('../../utils/generateRandomString');

const genres = {
  bug: '37i9dQZF1DWZgauS5j6pMv', // Nu-Funk
  dragon: '37i9dQZF1DX4SBhb3fqCJd', // Are & Be
  ice: '37i9dQZF1DX889U0CL85jj', // Chill Vibes
  fighting: '37i9dQZF1DX76Wlfdnj7AP', // Beast Mode
  fire: '37i9dQZF1DX0XUsuxWHRQd', // RapCaviar
  flying: '37i9dQZF1DXdbXrPNafg9d', // All New Indie
  grass: '6nU0t33tQA2i0qTI5HiyRV', // Country Hits
  ghost: '37i9dQZF1DX6xZZEgC9Ubl', // Tear Drop
  ground: '37i9dQZF1DXaSQZr9c1SpZ', // This Is Bon Iver
  electric: '37i9dQZF1DX4dyzvuaRJ0n', // mint
  normal: '37i9dQZF1DXcBWIGoYBM5M', // Today's Top Hits
  poison: '37i9dQZF1DWXIcbzpLauPS', // New Core
  psychic: '37i9dQZF1DX82GYcclJ3Ug', // New Alt
  rock: '37i9dQZF1DWXRqgorJj26U', // Rock Classics
  water: '37i9dQZF1DXdyjMX5o2vCq' // This Is Frank Ocean
}

// Credientials for SpotifyWebApi object
let spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri: 'https://pokespotify.herokuapp.com/api/spotify/callback'
});
const scopes = ['user-read-private', 'user-read-email', 'playlist-read-private', 'playlist-modify-private', 'playlist-modify-public'];
const state = generateRandomString(16);

// @route GET api/spotify/auth
// @desc Authorize Spotify User
// @access Public
router.get('/auth', (req, res) => {
  //Request Authentication
  let html = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(html);
});

router.get('/test', (req, res) => {
  res.json('Hello')
})

// @route GET api/spotify/callback
// @desc Callback in step 2 of Spotify Authorization Flow
// @access Public
router.get('/callback', (req, res) => {

  const code = req.query.code || null;
  
  spotifyApi.authorizationCodeGrant(code)
    .then(
      data => {
        console.log('The token expires in ' + data.body['expires_in']);

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        accessToken = data.body['access_token'];

        res.redirect('https://pokespotify.herokuapp.com/');
      })
    .catch(err => {
      res.status(400).json({error: err});
    })
});

// @route GET api/spotify/me
// @desc Retreive User data
// @access Public
router.get('/me', (req, res) => {
  spotifyApi.getMe()
    .then(data => res.json(data.body))
    .catch(err => res.json(err))
})

// @route GET api/spotify/refresh_token
// @desc Refresh Spotify API token
// @access Public
router.get('/refresh_token', (req, res) => {
  // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
  spotifyApi.refreshAccessToken().then(
    (data) => {
      console.log('The access token has been refreshed!');

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    (err) => {
      console.log('Could not refresh access token', err);
    }
  );
});

router.post('/makePlaylist', (req, res) => {
  const data = req.body;

  // Refactor this later :O
  let typesList = [];
  data.map(({ types }) => typesList.push(types))
  typesList = typesList.flat().map(({ type }) => type.name)
  // Make list of types unique
  typesList = [...new Set(typesList)]

  spotifyApi.getMe()
    .then(data => {

      spotifyApi.createPlaylist(data.body.id,'Pokemon Master Radio', {public : false})
        .then(data => {

          let playlistId = data.body.id;
          const playlistUrl = data.body.owner.external_urls.spotify
          
          // Add songs for each type
          typesList.map(type => {

            spotifyApi.getPlaylistTracks(genres[type], { limit: 12 - typesList.length })
              .then(data => {
                let tracks = [];
                data.body.items.map(item => {
                  tracks.push(item.track.uri)
                })

                spotifyApi.addTracksToPlaylist(playlistId, tracks)
                  .then(data => data)
                  .catch(err => console.log(err))
              })
              .catch(err => console.log(err))
          })

          // Send Playlist Url
          res.json(playlistUrl)
        }).catch(err =>  {
          console.log('Something went wrong!', err)
        });
    })
    .catch(err => console.log(err))
})

module.exports = router;
