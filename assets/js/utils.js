/* jshint esversion: 11, jquery: true */
/* global moment */

// Function to display error messages
export function showError(message) {
    $("#error-container")
        .text(message)
        .fadeIn()
        .delay(6000)
        .fadeOut();
}

// Function to format the date nicely
export function formatDate() {
    return moment().format('MMMM Do YYYY, hh:mm:ss a');
}

// Show loading animation
export function showLoading() {
    if (!$(".loading-spinner").length) {
        $("body").append('<div class="loading-spinner">Loading...</div>');
    }
}

// Hide Loading animation
export function hideLoading() {
    setTimeout(() => {
        $('.loading-spinner').remove();
    }, 1000);
}
