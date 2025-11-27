/* jshint esversion: 11, jquery: true */

import { showError, formatDate, showLoading, hideLoading } from "./utils.js";
import { runIntroAnimations, animateWeatherInfo, attachButtonHoverAnimations } from "./animations.js";

// Path to local JSON dataset (relative to index.html)
const localDataUrl = "assets/data/weather.json";

$(document).ready(function () {

    // -----------------------------
    // Modal helpers (plain jQuery)
    // -----------------------------
    function openIntroModal() {
        $("#introduction-modal")
            .addClass("active")
            .attr("aria-hidden", "false")
            .show(); // ensure it's visible
    }

    function closeIntroModal() {
        $("#introduction-modal")
            .removeClass("active")
            .attr("aria-hidden", "true")
            .hide(); // fully hide it
    }

    // Show introduction modal on load

    // Close the introduction modal when the "X" button is clicked
    $(".close-btn").on("click", function () {
        closeIntroModal();
    });

    // "How it works" button in the navbar opens the modal
    $("#open-help-btn").on("click", function () {
        openIntroModal();
    });

    // Optional: close modal when clicking the dark overlay
    $("#introduction-modal").on("click", function (e) {
        if (e.target === this) {
            closeIntroModal();
        }
    });

    // Optional: Esc key closes modal
    $(document).on("keydown", function (e) {
        if (e.key === "Escape") {
            closeIntroModal();
        }
    });

    // -----------------------------
    // Intro animations (GSAP in separate file)
    // -----------------------------
    runIntroAnimations();

    // Hover shake animation for city buttons
    attachButtonHoverAnimations();

    // -----------------------------
    // Event listeners
    // -----------------------------

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

    // -----------------------------
    // Handle user input
    // -----------------------------
    function handleWeatherSearch() {
        const city = $("#city-input").val().trim();

        if (!city) {
            showError("Please enter a city name.");
            return;
        }

        getLocalWeather(city);
        $("#city-input").val(""); // Clear input after search
    }

    // -----------------------------
    // Get weather from local JSON
    // -----------------------------
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
                showError(`${cityName} not available in this demo. Try another major city like Dublin, New York or Tokyo.`);
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

    // -----------------------------
    // Display weather details
    // -----------------------------
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

        const niceName = cityName
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');

        $('#city-name').text(`Weather for ${niceName}`);

        $("#temperature").html(`${data.current.temp}°C`);
        $("#description").text(data.current.weather[0].description);
        $("#wind-speed").html(`Wind Speed: ${data.current.wind_speed} km/h`);
        $("#date").text(formatDate());

        // Ensure it's visible
        $("#weather-info").css("display", "block");

        // Trigger GSAP animation from separate file
        animateWeatherInfo();
    }
});
