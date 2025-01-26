/* jshint esversion: 6, jquery: true */

// Function to display error messages
export function showError(message) {
    $("#error-container")
        .text(message)
        .fadeIn()
        .delay(3000)
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
    $(".loading-spinner").remove();
}
