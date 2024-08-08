const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 300;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

console.log(process.env.API_key)

async function aqiData(lat, long) {

    let response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=1&lon=1&appid=`);
    let data = await response.json();
    let jsonData = {
        'AQI': data["list"][0]['main']['aqi'],
        'Components': data["list"][0]['components']
    }

    return jsonData
};

aqiData(1, 1).then((data) => console.log(data))

