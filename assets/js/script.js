/* jshint esversion: 6, jquery: true */

// Import helper functions from utils.js
import { showError, formatDate, showLoading, hideLoading } from "./utils.js";

// API variables
let APIkey = "";
const url = "https://api.openweathermap.org/data/2.5/weather";

// Function to load API key from config.json
async function loadAPIkey() {
    try {
        const response = await fetch('../config.json'); // Adjust path if needed
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
        fetchWeatherData(city);
        $("#city-input").val(""); // Clear input after search
    }

    // Fetch weather data from OpenWeatherMap API
    async function fetchWeatherData(cityName) {
        if (!APIkey) {
            showError("API key not available.")
            return;
        }
        const requestURL = `${url}?q=${encodeURIComponent(cityName)}&appid=${APIkey}&units=metric`;

        try {
            showLoading(); // Show loading indicator
            const res = await fetch(requestUrl);
            const data = await res.json();

            if (res.ok) {
                displayWeather(data);
            } else {
                showError(data.message || "City not found.");
            }
        } catch (error) {
            showError("Error fetching weather data.");
            console.error("Fetch error:", error);
        } finally {
            hideLoading(); // Hide loading indicator
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

        $("#weather-icon").text(weatherIcons[data.weather[0].main] || "🌍");
        $("#city-name").text(data.name);
        $("#temperature").html(`${data.main.temp}°C`);
        $("#description").text(data.weather[0].description);
        $("#wind-speed").html(`Wind Speed: ${data.wind.speed} km/h`);
        $("#date").text(formatDate());

        $("#weather-info").fadeIn(); // Show the weather card
    }
});