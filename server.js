'use strict';

require('dotenv').config(); //to import dotenv
const express = require('express'); // import express
const cors = require('cors');
const axios = require('axios');


const server = express();
server.use(cors());

const PORT = process.env.PORT;
// const PORT = 3050;

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// const WEATHER_URL=process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

// 917d4889e531486f9d4bc9e9862bc8ea
// c26f668c2b0cc26cf9a1c1d5f15949ea

// http://localhost:3050/
server.get('/', (req, res) => {
    res.send('Hello, welcome at Home page');
});

// http://localhost:3050/weather
server.get('/weather', (req, res) => {

    let city = req.query.city;
    // const searchQuery = 'amman';

    const requestUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${WEATHER_API_KEY}`;
    // console.log(city);


    axios
        .get(requestUrl)
        .then(result => {
            const arrayOfWeather = result.data.data.map(cityName => {
                return new Forecast(cityName);
                //  console.log(arrayOfWeather);
            })
            res.send(arrayOfWeather);

        })
        .catch(err => {
            res.status(404).send('the page not found');
        })
});

let myMemory = {};

// http://localhost:3050/movies
server.get('/movies', (req, res) => {

    let searchQuery = req.query.query;
   

    const requestUrl = `http://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQuery}`;

   

    if (myMemory[searchQuery] !== undefined) {
        console.log('get the data from my memory');
        res.send(myMemory[searchQuery]);
    }
    
    else {
        console.log('get the date from required API');
        axios
            .get(requestUrl)
            .then(result => {


                const arrayOfMovies = result.data.results.map(movieItem => {


                    return new Movie(movieItem);
                    //  console.log(arrayOfMovies);
                })

                myMemory[searchQuery] = arrayOfMovies;

                res.send(arrayOfMovies);

            })

            .catch(err => {
                res.status(404).send('the page of Movie not found');
            })
        }
    });



// uneversal : http://localhost:3050/******* */  **Always End**
server.get('*', (req, res) => {
    res.status(500).send('Sory , Page Not found');
});

class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = `low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    }
}

class Movie {
    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview;
        this.vote_average = movie.vote_average;
        this.total_votes = movie.total_votes;
        this.poster_path = movie.poster_path;
        this.popularity = movie.popularity;

        // this.title=movie.title;
        // this.title=movie.title;
    }
}

server.listen(PORT, () => {
    console.log(`im listening on ${PORT}`);
});





