require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const cookieParser = require('cookie-parser');
const path = require('path');
const port = process.env.PORT || 5000;

const app = express();

const spotify = require('./routes/api/spotify');

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Bodyparser, CORS, and Cookie Parser Middleware
app.use(express.json({extended: false}))
    .use(cookieParser());

// DB Config
const db = process.env.MONGO_URI

// Connect to Mongo
mongoose.connect(db, { 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport Middelware
app.use(passport.initialize());

app.get('/', (req, res) => res.redirect('http://localhost:3000'));

// Use routes
app.use('/api/spotify', spotify);

app.listen(port, () => console.log('Serving running on port ' + port));
