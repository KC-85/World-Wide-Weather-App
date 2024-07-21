function showError(message) {
    const errorBox = document.querySelector('.error-box');
    const errorMessage = document.querySelector('.error-message')};

search.addEventListener ('click', () => {
    const APIkey = ('5ba3a0833b8cf2821b6f85c07081ec3a');
    const input = document.querySelector('.search-box input').value;

    if (input === '') 
        return;
})

$(document).ready(function () {
    weatherFn('Lincolnshire');
});
 
async function weatherFn(cName) {
    const temp =
        `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
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