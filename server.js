'use strict';


require('dotenv').config();
const cors = require('cors');
const express = require('express');
const weatherData = require('./data/weather.json');


const server = express();
server.use(cors());

const PORT = process.env.PORT;

// http://localhost:3010/
server.get('/', (req, res) => {
    res.send('welcome at Home');

})

// http://localhost:3010/weather?city=Amman

server.get('/weather', (req, res) => {
    // console.log(weatherData);
    let cityName = req.query.city;

    let searchQuery = weatherData.find(item => {
        if (cityName == item.city_name)
            return item;
    })

    res.send(searchQuery);
    console.log(searchQuery);

    // try {
    //     // let date;
    //     // let description;
    //     // let newForecast;

    //     let weatherArray = searchQuery.data.map(item => {
    //         // date = item.valid_date;
    //         // description = item.weather.description;

    //         // let weatherArray = weatherData[0].data.map(item => {
    //         //    console.log(item.weather.description);
    //         //    return [item.datetime, item.weather.description];
    //         return new Weatherstatus(item);

    //     })
    //     res.send(weatherArray);
    //     console.log(weatherArray);
    // }

    // catch (err) {
    //     res.status(404).send('the page not found');

    // }

})

// http://localhost:3010/weather?city=Amman&

// server.get('/weather',(req,res)=>{
//     // console.log(weatherData);
//     let cityName=req.query.city;

//     let searchQuery=weatherData.find(item =>{
//         if (cityName==item.city_name)
//         return item;
//     })

//     res.send(searchQuery);

//     })


server.get('*', (req, res) => {
    res.status(404).send('Eroor, Not Found')

})

server.listen(PORT, () => {
    console.log(`Listining on PORT ${PORT}`);

})


