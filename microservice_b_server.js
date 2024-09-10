const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function aqiData(lat, lon, key) {

    let response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}1&appid=${key}`);
    let data = await response.json();
    let jsonData = {
        'aqi': data["list"][0]['main']['aqi'],
        'components': data["list"][0]['components']
    }

    return jsonData
};

app.post("/aqiData", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'alloweddomain.com')
    aqiData(req.body["lat"], req.body["lon"], req.body["key"]).then((data) =>
        res.send(data))
})

app.listen(PORT, () => {
    console.log(`Litsening on port ${PORT}`)
});
