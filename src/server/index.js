// dependencies
var path = require("path");

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
const port = 8081;

const server = app.listen(port, listening ());

function listening() {
	console.log(`server running on localhost:${port}`);
}