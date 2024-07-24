/* jshint esversion: 11, jquery: true */

let search = $("#city-input-btn");
let url = "https://api.openweathermap.org/data/2.5/weather";
const APIkey = '5ba3a0833b8cf2821b6f85c07081ec3a';

function showError(message) {
    const errorBox = $('<div class="error-box"></div>');
    const errorMessage = $('<p class="error-message"></p>').text(message);
    errorBox.append(errorMessage);
    $('body').append(errorBox);
    errorBox.fadeIn().delay(3000).fadeOut(() => errorBox.remove());
}

search.on('click', () => {
    const input = $("#city-input").val();
    if (input === '') {
        showError('Please enter a city name.');
        return;
    }
    weatherFn(input);
});

$(document).ready(function () {
    weatherFn('Your Local Weather');
});

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${APIkey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            showError('City not found. Please try again.');
        }
    } catch (error) {
        showError('Error fetching weather data.');
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    const weatherCard = document.querySelector('.weather-card');
    const weatherConditions = {
        Clear: 'clear.jpg',
        Clouds: 'clouds.jpg',
        Rain: 'rain.jpg',
        Drizzle: 'drizzle.jpg',
        Thunderstorm: 'thunderstorm.jpg',
        Snow: 'snow.jpg',
        Mist: 'mist.jpg',
    };

    const condition = data.weather[0].main;
    const backgroundImage = weatherConditions[condition] || 'default.jpg';

    weatherCard.style.backgroundImage = `url('images/${backgroundImage}')`;
    weatherCard.style.backgroundSize = 'cover';
    weatherCard.style.backgroundPosition = 'center';

    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, hh:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} km/h`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#weather-info').fadeIn();
}
