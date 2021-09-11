'use strict'


class Movie {
    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview;
        this.vote_average = movie.vote_average;
        this.total_votes = movie.total_votes;
        this.poster_path = movie.poster_path;
        this.popularity = movie.popularity;


    }
}

module.exports = Movie;