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

const server = app.listen(port, listening ());

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
        //date: req.body.date
    }

    const img = await getImg(input);
    const loc = await getLoc(input);
    //const weather = await getWeather(loc);

    try {
        const allData = {
            img: img,
            loc: loc,
            //weather: weather
        }
        res.send(allData);
    } catch (error) {
        console.log("Error: " + error);
    }
}

// POST data
app.post("/apis", addData);


// GET Pixabay Data
const getImg = async (input) => {
    const location = input.location;
    const PixURL = "https://pixabay.com/api/?key=";
    const PixKey = process.env.PIXABAY_KEY;
    const url = PixURL+PixKey+"&q="+encodeURIComponent(location)+"&image_type=photo&category=places";
    console.log('URL: ' + url);
    const request = await fetch(url);
    try {
        const response = await request.json();
        console.log(response.hits[0]);
        return response.hits[0];
    } catch (error) {
        console.log("Error in getImg GET: " + error);
        res.send(error);
    }
}

// GET Geonames Data (lat, lon)
const getLoc = async (input) => {
    const location = input.location;
    const GeoURL = "http://api.geonames.org/searchJSON?name=";
    const GeoKey = process.env.GEO_KEY;
    const url = GeoURL+encodeURIComponent(location)+'&maxRows=1&username='+GeoKey;
    const request = await fetch(url);
    try {
      const response = await request.json();
      if (response.geonames == null) {
        console.log('No Location found!');
      } else {
        console.log(response.geonames[0]);
        return response.geonames[0];
      }
    } catch (error) {
        console.log('Error in getLoc GET: ' + error);
    }
}
