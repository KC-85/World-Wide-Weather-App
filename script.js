/* jshint esversion: 11, jquery: true */

let search = $("#city-input-btn");
let url = "api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5ba3a0833b8cf2821b6f85c07081ec3a"; // paste the API URL here in the quotes

function showError(message) {
    const errorBox = document.querySelector('.error-box');
    const errorMessage = document.querySelector('.error-message');
}

search.on('click', () => {
    const APIkey = ('5ba3a0833b8cf2821b6f85c07081ec3a');
    const input = $("#city-input").val();

    if (input === '') 
        return;
})

$(document).ready(function () {
    weatherFn('Lincolnshire');
});

async function weatherFn(cName) {
    const temp =
        `${url}?q=${cName}&appid=${APIKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');  // consider replacing this with a dialogue: https://www.youtube.com/watch?v=ywtkJkxJsdg
        }
    } catch (error) {
        showError(error);
        console.error('Error fetching weather data:', error);
    }
}
 
function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().
        format('MMMM Do YYYY, hh:mm:ss a'));
    $('#temperature').
        html(`${data.main.temp}°C`);
    $('#description').
        text(data.weather[0].description);
    $('#wind-speed').
        html(`Wind Speed: ${data.wind.speed} km/h`);
    $('#weather-icon').
        attr('src',
            `...`);
    $('#weather-info').fadeIn();
}