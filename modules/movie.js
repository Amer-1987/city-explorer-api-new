'use strict'

const axios = require('axios');
const Movie = require('./movieClass.js')

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;


function movieFunction(req, res) {

    let searchQuery = req.query.query;
    console.log(req.query);

    // const searchQuery = 'amman';
    const requestUrl = `http://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQuery}`;



    axios
        .get(requestUrl)
        .then(result => {

            console.log(555);

            const arrayOfMovies = result.data.results.map(movieItem => {

                return new Movie(movieItem);
                //  console.log(arrayOfMovies);
            })
            res.send(arrayOfMovies);

        })
        .catch(err => {
            res.status(404).send('the page of Movie not found');
        })
};



module.exports = movieFunction;