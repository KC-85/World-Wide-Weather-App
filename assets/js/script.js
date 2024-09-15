/* jshint esversion: 11, jquery: true */

$(document).ready(function () {
    const APIkey = '5ba3a0833b8cf2821b6f85c07081ec3a';
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const search = $("#city-input-btn");

    // Show introduction modal on page load
    $('#introduction-modal').show();

    // Close the introduction modal
    $('.close-btn').on('click', function () {
        $('#introduction-modal').hide();
    });

    // Handle the search button click
    search.on('click', function () {
        const input = $("#city-input").val().trim();
        if (input === '') {
            showError('Please enter a city name.');
            return;
        }
        fetchWeatherData(input);
    });

    // Function to show error messages
    function showError(message) {
        const errorBox = $('<div class="error-box"></div>');
        const errorMessage = $('<p class="error-message"></p>').text(message);
        errorBox.append(errorMessage);
        $('body').append(errorBox);
        errorBox.fadeIn().delay(3000).fadeOut(() => errorBox.remove());
    }

    // Function to fetch weather data
    async function fetchWeatherData(cityName) {
        const requestUrl = `${url}?q=${encodeURIComponent(cityName)}&appid=${APIkey}&units=metric`;
        try {
            showLoading();
            const res = await fetch(requestUrl);
            const data = await res.json();
            if (res.ok) {
                displayWeather(data);
            } else {
                showError(data.message || 'City not found. Please try again.');
            }
        } catch (error) {
            showError('Error fetching weather data.');
            console.error('Error fetching weather data:', error);
        } finally {
            hideLoading();
        }
    }

    // Function to display the weather data
    function displayWeather(data) {
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

        const weatherCard = $('.weather-card');
        weatherCard.css({
            'background-image': `url('images/${backgroundImage}')`,
            'background-size': 'cover',
            'background-position': 'center'
        });

        $('#city-name').text(data.name);
        $('#date').text(moment().format('MMMM Do YYYY, hh:mm:ss a'));
        $('#temperature').html(`${data.main.temp}°C`);
        $('#description').text(data.weather[0].description);
        $('#wind-speed').html(`Wind Speed: ${data.wind.speed} km/h`);
        $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        $('#weather-info').fadeIn();
    }

    // Show loading spinner
    function showLoading() {
        const loadingSpinner = $('<div class="loading-spinner">Loading...</div>');
        $('body').append(loadingSpinner);
    }

    // Hide loading spinner
    function hideLoading() {
        $('.loading-spinner').remove();
    }
});
