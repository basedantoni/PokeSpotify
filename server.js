const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/spotify', req, res) => {
    res.send('Spotify');
});

app.listen(process.env.PORT || 5000, () => console.log('Serving running ... '));
