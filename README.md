# Project Description
Travel App Project for the Front End Web Developer course from Udacity \
Author: Tatjana \
Used technologies: HTML, Sass, JavaScript, Node, Express, Webpack, Jest, Workbox, APIs... \
\
This project allows you to enter a city you want to travel to and a date. The website will provide you an image of your destination and a weather forecast.

# Getting started
1. install **node.js**, if you haven't already
2. open a new terminal (cmd)
3. check your node version: `node -v`
4. open the project folder and copy the path
5. change the directory to the folder path: `cd path`
6. install all npm packages you need: `npm install`
7. get your personal API_KEYs of [GeoNames](http://www.geonames.org/export/web-services.html), [Weatherbit](https://www.weatherbit.io/account/dashboard), [Pixabay](https://pixabay.com/api/docs/)
8. rename the ***.env_sample*** file to ***.env*** and insert your personal API Keys.
    ```javascript
        GEO_KEY=**********
        WEATHER_KEY=**********
        PIXABAY_KEY=**********
    ```
9. build the project: `npm run build-prod`
10. start a local server: `npm run start`
11. open your browser and navigate to ***http://localhost:8081/***

## other modes
* `npm run test` - testing of some functions
* `npm run build-dev` - development mode on ***http://localhost:8080/*** to start a live server to see changes without having to build the project again