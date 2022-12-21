export function handleSubmit(event) {
    event.preventDefault();

    //get input
    const city = document.getElementById('city').value.toString();
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    //calculate trip length
    const days = daysBetween(start, end);

    console.log("City: " + city);
    console.log("Start Date: " + start);
    console.log("End Date: " + end);
    console.log("Trip days: " + days);

    Client.postData("http://localhost:3001/apis", {location: city, start: start, end: end});

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

export function daysBetween(date1, date2) {
  const dateObject1 = new Date(date1);
  const dateObject2 = new Date(date2);

  const timeDifference = Math.abs(dateObject1.getTime() - dateObject2.getTime());

  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24) + 1);
}

export function updateUI(data) {
    console.log('Data:');
    console.log(data);

    const city = document.getElementById('city').value.toString();
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const days = daysBetween(start, end); 

    document.getElementById("city-name").style.visibility = "visible";
    document.getElementById("city-name").innerHTML = city.charAt(0).toUpperCase() + city.slice(1) + " for " + days + " days";

    document.getElementById("city-img").src = data.img.webformatURL;
    for (let i=1; i<=7; i++) {
      document.getElementById(`ico${i}`).src = "https://www.weatherbit.io/static/img/icons/"+data.weather[i-1].weather.icon+".png";
      document.getElementById(`date${i}`).innerHTML = data.weather[i-1].datetime;
      document.getElementById(`high${i}`).innerHTML = data.weather[i-1].max_temp+"°C";
      document.getElementById(`low${i}`).innerHTML = data.weather[i-1].min_temp+"°C";
    }
}