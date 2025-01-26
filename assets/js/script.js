/* jshint esversion: 6, jquery: true */

// Import helper functions from utils.js
import { showError, formatDate, showLoading, hideLoading } from "./utils.js";

// API variables
let APIkey = "";
const baseUrl = "https://api.openweathermap.org/data/3.0/onecall"; // OpenWeatherMap One Call API 3.0

// Function to load API key from config.json
async function loadAPIkey() {
    try {
        const response = await fetch('../config.json'); // Ensure this file exists
        const data = await response.json();
        APIkey = data.API_KEY;
    } catch (error) {
        console.error("Error loading API key:", error);
        showError("Failed to load API key.");
    }
}

// Load API key on script load
loadAPIkey();

// Wait for DOM to load
$(document).ready(function () {
    
    // Event listener for button click
    $("#city-input-btn").on("click", function () {
        handleWeatherSearch();
    });

    // Close the introduction modal when the "X" button is clicked
    $(".close-btn").on("click", function () {
    $("#introduction-modal").fadeOut();
    });

    // Allow "Enter" key to trigger search
    $("#city-input").keypress(function (e) {
        if (e.which === 13) handleWeatherSearch();
    });

    // Function to handle user input and fetch weather
    function handleWeatherSearch() {
        const city = $("#city-input").val().trim();
        if (!city) {
            showError("Please enter a city name.");
            return;
        }

        // Call function to get latitude & longitude from city name
        getCoordinates(city);
        $("#city-input").val(""); // Clear input after search
    }

    // Function to get latitude & longitude using OpenWeatherMap Geocoding API
    async function getCoordinates(cityName) {
        if (!APIkey) {
            showError("API key not available.");
            return;
        }

        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${APIkey}`;

        try {
            showLoading();
            const res = await fetch(geoUrl);
            const data = await res.json();

            if (data.length === 0) {
                showError("City not found. Please try again.");
                hideLoading();
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            // Now fetch weather data using lat & lon
            fetchWeatherData(lat, lon);
        } catch (error) {
            showError("Error fetching location data.");
            console.error("Location fetch error:", error);
        }
    }

    // Fetch weather data from OpenWeatherMap One Call API 3.0
    async function fetchWeatherData(lat, lon) {
        if (!APIkey) {
            showError("API key not available.");
            return;
        }

        const requestURL = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;

        try {
            showLoading();
            const res = await fetch(requestURL);
            const data = await res.json();

            if (res.ok) {
                displayWeather(data);
            } else {
                showError(data.message || "Error retrieving weather data.");
            }
        } catch (error) {
            showError("Error fetching weather data.");
            console.error("Weather fetch error:", error);
        } finally {
            hideLoading();
        }
    }

    // Function to display weather details
    function displayWeather(data) {
        const weatherIcons = {
            Clear: "☀️",
            Clouds: "☁️",
            Rain: "🌧️",
            Drizzle: "🌦️",
            Thunderstorm: "⛈️",
            Snow: "❄️",
            Mist: "🌫️"
        };

        $("#weather-icon").text(weatherIcons[data.current.weather[0].main] || "🌍");
        $("#city-name").text("Weather for Selected Location");
        $("#temperature").html(`${data.current.temp}°C`);
        $("#description").text(data.current.weather[0].description);
        $("#wind-speed").html(`Wind Speed: ${data.current.wind_speed} km/h`);
        $("#date").text(formatDate());

        $("#weather-info").fadeIn(); // Show the weather card
    }
});
