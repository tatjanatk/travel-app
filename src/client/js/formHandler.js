//import axios from "axios";

export function handleSubmit(event) {
    event.preventDefault();

    //get input
    const city = document.getElementById('city').value.toString();
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    // start & end date

    console.log("City: " + city);
    console.log("Start Date: " + start);
    console.log("End Date: " + end);

    Client.postData("http://localhost:3001/apis", {location: city});

}

export const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(data),
    })
    try {
      const newData = await response.json();
      Client.updateUI(newData);
    } catch (error) {
      alert('Location not found!');
    }
  }

export function updateUI(data) {
    console.log('Data:');
    console.log(data);
    //console.log(data.img.webformatURL);
    document.getElementById("city-img").src = data.img.webformatURL;
    //document.getElementById("weather-data").innerHTML = data.weather.
}