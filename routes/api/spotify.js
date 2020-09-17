require('dotenv').config();

const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const generateRandomString = require('../../utils/generateRandomString');

let accessToken;

// Credientials for SpotifyWebApi object
let spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri: 'http://localhost:5000/api/spotify/callback'
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

        res.redirect('http://localhost:3000');
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
  data.map(({ types }) => console.log(types))

  spotifyApi.createPlaylist('1279658217','Pokemon Master Radio', {public : false})
    .then(data => {
      console.log('Created playlist!')
      console.log(data.body)
    }).catch(err =>  {
      console.log('Something went wrong!', err)
    });

  res.json('all good')
})

module.exports = router;
