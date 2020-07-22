require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = process.env.PORT || 5000;

const app = express();

const spotify = require('./routes/api/spotify');

// Bodyparser, CORS, and Cookie Parser Middleware
app.use(express.json({extended: false}))
    .use(cors())
    .use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.send('Hello World!'));

// Use routes
app.use('/api/spotify', spotify);

app.listen(port, () => console.log('Serving running on port ' + port));
