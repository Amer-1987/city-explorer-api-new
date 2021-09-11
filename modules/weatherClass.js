'use strict'


class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = `low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    }
}

module.exports = Forecast;
