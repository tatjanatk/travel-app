export function handleSubmit(event) {
    event.preventDefault();

    //get input
    const city = document.getElementById('city').value;
    const date = document.getElementById('date').value;

    console.log("City: " + city + " Date: " + date);

}