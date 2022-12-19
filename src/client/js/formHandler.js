//import axios from "axios";

export function handleSubmit(event) {
    event.preventDefault();

    //get input
    const city = document.getElementById('city').value.toString();
    //const date = document.getElementById('date').value;

    console.log("City: " + city + " Date: ");

    Client.postData("http://localhost:3001/pixabay", {location: city});

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
      console.log('New Data: ' + newData);
      Client.updateUI(newData);
    } catch (error) {
      console.log('ERROR in POST:', error);
    }
  }

export function updateUI(data) {
    console.log(data);
    //console.log(data.img.webformatURL);
    document.getElementById("city-img").src = data.img.webformatURL;
}