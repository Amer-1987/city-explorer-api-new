'use strict'

const axios = require('axios');
const Forecast = require ('./weatherClass.js');


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

function weatherFunction(req, res) {

    let city = req.query.city;

    const requestUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${WEATHER_API_KEY}`;
    console.log(city);


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
};


module.exports = weatherFunction;