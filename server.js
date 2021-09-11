'use strict';

require('dotenv').config(); //to import dotenv
const express = require('express'); // import express
const cors = require('cors');
// const axios = require('axios');

const server = express();
server.use(cors());

const weatherFunction = require ('./modules/weather.js');

const movieFunction = require ('./modules/movie.js')

const PORT = process.env.PORT;
// const PORT = 3030;


// http://localhost:3030/
server.get('/', (req, res) => {
    res.send('Hello, welcome at Home page');
});

// http://localhost:3030/weather
server.get('/weather', weatherFunction);

// http://localhost:3030/movies
server.get('/movies', movieFunction);

// uneversal : http://localhost:3030/ */  **Always End**
server.get('*', (req, res) => {
    res.status(500).send('Sory , Page Not found');
});


server.listen(PORT, () => {
    console.log(`im listening on ${PORT}`);
});





