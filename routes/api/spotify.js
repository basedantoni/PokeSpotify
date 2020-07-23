require('dotenv').config();

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const generateRandomString = require('../../utils/generateRandomString');

const router = express.Router();
const User = require('../../models/User');

let authCode = '';

// Credientials for SpotifyWebApi object
let spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri: 'http://localhost:5000/api/spotify/callback'
});
const scopes = ['user-read-private', 'user-read-email'];
const state = generateRandomString(16);
const authorizeUrl = spotifyApi.createAuthorizeURL(scopes, state);

// @route GET api/spotify/auth
// @desc Authorize Spotify User
// @access Public
router.get('/auth', (req, res) => {
  //Request Authentication
  res.redirect(authorizeUrl);
});

// @route GET api/spotify/callback
// @desc Callback in step 2 of Spotify Authorization Flow
// @access Public
router.get('/callback', (req, res) => {

  let code = req.query.code || null;
  authCode = req.query.code;
  
  spotifyApi.authorizationCodeGrant(code)
    .then(
      data => {
        console.log('The token expires in ' + data.body['expires_in']);

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        accessToken = data.body['access_token'];
      })
    .catch(err => {
      console.log(err);
    })
    res.redirect('http://localhost:3000');
});

router.get('/me', (req, res) => {
  console.log(authCode)

  spotifyApi.authorizationCodeGrant(authCode)
    .then(data => {
      console.log(data)
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
    })
    .catch(err => {
      console.log(err);
    })
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

module.exports = router;
