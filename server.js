'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();

const weatherdata = require('./data/weather.json')

const PORT = process.env.PORT;
server.use(cors());
class Forecast {
    constructor(date, desc) {
        this.date = date
        this.desc = desc
    }
}

// localhost:3001/
// https://class07-301d33.herokuapp.com/
server.get('/', (req, res) => {
    res.status(200).send('home route')
})


server.get('/weather', (req, res) => {
    let cityName =  req.query.cityName;
    let cityInfo = weatherdata.find(element => {
            if (element.city_name === cityName) {
                return element;
            }
        });
    let data = cityInfo.data.map(element => {
            return new Forecast(element.datetime,
                element.weather.description);
        });
    res.send(data);
});

// localhost:3005/ANYTHING
server.get('*', (req, res) => {
    res.status(404).send('route is not found')
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})