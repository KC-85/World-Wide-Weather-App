/* jshint esversion: 6, jquery: true */

// This script will get local weather data from a JSON file 
// Note: This will not be real-time data

import { showError, formatDate, showLoading, hideLoading } from "./utils.js";

// Path to local JSON dataset (relative to index.html)
const localDataUrl = "assets/data/weather.json";

$(document).ready(function () {

    // ---- Modal helpers ----
    function openIntroModal() {
        $("#introduction-modal")
            .addClass("active")
            .attr("aria-hidden", "false")
            .fadeIn(200);
    }

    function closeIntroModal() {
        $("#introduction-modal")
            .fadeOut(200, function () {
                $(this)
                    .removeClass("active")
                    .attr("aria-hidden", "true");
            });
    }

    // Show introduction modal on load (remove this line if you only want it via the button)
    // openIntroModal();

    // Close the introduction modal when the "X" button is clicked
    $(".close-btn").on("click", function () {
        closeIntroModal();
    });

    // 🔹 "How it works" button in the navbar opens the modal
    $("#open-help-btn").on("click", function () {
        openIntroModal();
    });

    // Button click triggers search
    $("#city-input-btn").on("click", function () {
        handleWeatherSearch();
    });

    // Enter key in input triggers search
    $("#city-input").on("keypress", function (e) {
        if (e.which === 13) {
            handleWeatherSearch();
        }
    });

    // Quick-select city buttons
    $(".city-btn").on("click", function () {
        const city = $(this).data("city");
        getLocalWeather(city);
    });

    // Handle user input
    function handleWeatherSearch() {
        const city = $("#city-input").val().trim();

        if (!city) {
            showError("Please enter a city name.");
            return;
        }

        getLocalWeather(city);
        $("#city-input").val(""); // Clear input after search
    }

    // Get weather from local JSON file
    async function getLocalWeather(cityName) {
        try {
            showLoading();

            const res = await fetch(localDataUrl);
            if (!res.ok) {
                throw new Error("Failed to load local weather data.");
            }

            const allData = await res.json();

            const key = cityName.toLowerCase();
            const cityData = allData[key];

            if (!cityData) {
                showError("City not available in this demo. Try another major city like Dublin, New York or Tokyo.");
                return;
            }

            displayWeather(cityData, cityName);

        } catch (error) {
            console.error("Local data error:", error);
            showError("Error loading local weather data.");
        } finally {
            hideLoading();
        }
    }

    // Display weather details in the DOM
    function displayWeather(data, cityName) {
        const weatherIcons = {
            Clear: "☀️",
            Clouds: "☁️",
            Rain: "🌧️",
            Drizzle: "🌦️",
            Thunderstorm: "⛈️",
            Snow: "❄️",
            Mist: "🌫️"
        };

        const main = data.current.weather[0].main;

        $("#weather-icon").text(weatherIcons[main] || "🌍");
        $("#city-name").text(`Weather for ${cityName}`);
        $("#temperature").html(`${data.current.temp}°C`);
        $("#description").text(data.current.weather[0].description);
        $("#wind-speed").html(`Wind Speed: ${data.current.wind_speed} km/h`);
        $("#date").text(formatDate());

        $("#weather-info").fadeIn();
    }
});
