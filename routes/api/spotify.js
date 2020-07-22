require('dotenv').config();

const express = require('express');
const request = require('request');
const querystring = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');
const generateRandomString = require('../../utils/generateRandomString');

const router = express.Router();

// Credientials for SpotifyWebApi object
let spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  redirectUri: 'http://localhost:8080/api/spotify/callback'
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
  
  spotifyApi.authorizationCodeGrant(code).then(
    data => {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
    },
    err => {
      console.log(`Something went wrong: ${err}`)
    }
  )

});

// router.get('/callback', function(req, res) {

//     // your application requests refresh and access tokens
//     // after checking the state parameter

//     var code = req.query.code || null;
//     var state = req.query.state || null;
//     var storedState = req.cookies ? req.cookies[stateKey] : null;

//     if (state === null || state !== storedState) {
//         res.redirect('/#' +
//             querystring.stringify({
//                 error: 'state_mismatch'
//             }));
//     } else {
//         res.clearCookie(stateKey);
//         var authOptions = {
//             url: 'https://accounts.spotify.com/api/token',
//             form: {
//                 code: code,
//                 redirect_uri: redirect_uri,
//                 grant_type: 'authorization_code'
//             },
//             headers: {
//                 'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
//             },
//             json: true
//     };

//     request.post(authOptions, function(error, response, body) {
//         if (!error && response.statusCode === 200) {

//             var access_token = body.access_token,
//             refresh_token = body.refresh_token;

//             var options = {
//                 url: 'https://api.spotify.com/v1/me',
//                 headers: { 'Authorization': 'Bearer ' + access_token },
//                 json: true
//             };

//             // use the access token to access the Spotify Web API
//             request.get(options, function(error, response, body) {
//             console.log(body);
//             });

//             // we can also pass the token to the browser to make requests from there
//             res.redirect('/#' +
//                 querystring.stringify({
//                     access_token: access_token,
//                     refresh_token: refresh_token
//                 }));
//         } else {
//             res.redirect('/#' +
//                 querystring.stringify({
//                 error: 'invalid_token'
//             }));
//         }
//     });
//   }
// });

// router.get('/refresh_token', function(req, res) {

//   // requesting access token from refresh token
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { 'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')) },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       res.send({
//         'access_token': access_token
//       });
//     }
//   });
// });

module.exports = router;
