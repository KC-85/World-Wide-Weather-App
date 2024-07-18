$(document).ready(function () {
    weatherFn('Lincolnshire');
});
 
async function weatherFn(cName) {
    const temp =
        `${'https://api.openweathermap.org/data/2.5/weather'}?q=${cName}&appid=${'f00c38e0279b7bc85480c3fe775d518c'}&units=metric`;
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
        html(`Wind Speed: ${data.wind.speed} mph`);
    $('#weather-icon').
        attr('src',
            `...`);
    $('#weather-info').fadeIn();
}