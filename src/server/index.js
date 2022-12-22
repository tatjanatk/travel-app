// dependencies
var path = require("path");
const axios = require("axios");

//keep api key private
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

// start instance of app
const app = express();

// use body-parser as middle-ware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// main project folder
app.use(express.static('dist'));

console.log(__dirname);

// designates what port the app will listen to for incoming requests
const port = 3001;

app.listen(port, listening ());

function listening() {
	console.log(`server running on localhost:${port}`);
}

// GET data
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});


// send data to app
const addData = async(req, res) => {
    const input = {
        location: req.body.location,
        //start: req.body.start,
        //end: req.body.end
    }

    const img = await getImg(input);
    const weather = await getLoc(input);

    try {
        const allData = {
            img: img,
            weather: weather,
        }
        res.send(allData);
    } catch (error) {
        console.log("Error: " + error);
        res.send(error);
    }
}

// POST data
app.post("/apis", addData);


// GET Pixabay Data
    const getImg = async (input) => {
    const location = input.location;
    const pixURL = "https://pixabay.com/api/?key=";
    const pixKey = process.env.PIXABAY_KEY;
    const url = pixURL+pixKey+"&q="+encodeURIComponent(location)+"&image_type=photo&category=places";
    console.log('URL: ' + url);
    const request = await fetch(url);
    try {
        const response = await request.json();
        console.log(response.hits[0]);
        return response.hits[0];
    } catch (error) {
        console.log("Error in getImg GET: " + error);
    }
}

// GET Geonames Data (lat, lon)
    const getLoc = async (input) => {
    const location = input.location;
    const geoURL = "http://api.geonames.org/searchJSON?name=";
    const geoKey = process.env.GEO_KEY;
    const url = geoURL+encodeURIComponent(location)+'&maxRows=1&username='+geoKey;
    const request = await fetch(url);
    try {
      const response = await request.json();
      if (response.geonames == null) {
        console.log('No Location found!');
      } else {
        const locData = response.geonames[0];
        const lat = locData.lat;
        const lon = locData.lng;
        console.log('Lat: ' + lat + ' Lon: ' + lon);
        return getWeather(lat, lon);
      }
    } catch (error) {
        console.log('Error in getLoc GET: ' + error);
    }
}

// GET weather with data from geonames api
// doesn't work with start & end date
const getWeather = async (lat, lon) => {
    console.log("putting data in Weatherbit Api: ", lat, lon);
    const weatherURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
    const weatherKey = process.env.WEATHER_KEY;
    const latlng = "lat="+lat+"&lon="+lon+"&days=7&key=";
    const url = weatherURL+latlng+weatherKey;
    console.log(url);
    const request = await fetch(url);
    try {
       const response = await request.json();
       console.log(response.data);
       return response.data;
    } catch (error) {
        console.log('Error in getWeather GET: ' + error);
    }
}