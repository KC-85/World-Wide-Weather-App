# World Wide Weather App

Weather App
A user-friendly weather application that provides real-time weather information for any specified city using the OpenWeatherMap API. The app features dynamic background images based on weather conditions and visually appealing icons for the moon and sun.

# User Experience
Design
The Weather App is designed to be simple and intuitive, providing users with all necessary weather information at a glance. The app includes dynamic backgrounds and visually appealing icons to enhance the user experience.

Colour Scheme
The app uses a gradient background that transitions from black to blue, symbolizing the sky and weather. Additional color schemes are used for text and buttons to ensure readability and aesthetic appeal.

Wireframes
Initial wireframes were designed to outline the layout of the app, including the positioning of the input field, button, weather information display, and introduction modal. These wireframes served as a blueprint for the final design.

Features
The Home Page
Search for Weather: Users can enter a city name to get current weather information.
Weather Information: Displays temperature, weather conditions, wind speed, and current date and time.
Dynamic Backgrounds: Changes background images based on weather conditions.
Visual Elements: Moon and sun icons displayed at the top corners for visual enhancement.
Error Handling: User-friendly error messages for invalid city names or network issues.
Introduction Modal: A welcoming introduction modal that explains the app’s functionality.
Future Implementations
Additional Weather Metrics: Include humidity, pressure, and visibility.
Location-Based Weather: Automatically detect the user's location and display weather information.
Forecast Information: Provide weather forecast for the next few days.
Multi-language Support: Add support for multiple languages.
Accessibility
The app is designed to be accessible to all users, including those with disabilities. Efforts have been made to ensure proper contrast, readable fonts, and keyboard navigation.

Languages Used
HTML
CSS
JavaScript (with jQuery)
Frameworks, Libraries & Programs Used
OpenWeatherMap API: For fetching weather data.
Moment.js: For date formatting.
jQuery: For simplifying JavaScript operations.
Flaticon: For weather icons.
Deployment & Local Development
Deployment
The app can be deployed to any web server. Below are steps to deploy using GitHub Pages:

Push the code to a GitHub repository.
Go to the repository settings.
Under the "GitHub Pages" section, set the source to the main branch.
Save the settings. Your app will be available at https://yourusername.github.io/weather-app.
Local Development
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/weather-app.git
cd weather-app
Download and Save Images:

Save the following images in the images directory:
clear.jpg: 
clouds.jpg: 
rain.jpg: 
drizzle.jpg: 
thunderstorm.jpg: 
snow.jpg: 
mist.jpg: 
default.jpg: 
moon.png: 
sun.png: 
Create an OpenWeatherMap Account:

Create an account on OpenWeatherMap and obtain your API key.
Configure the API Key:

Open script.js and replace const APIkey = 'your-api-key-here'; with your actual API key:
javascript
Copy code
const APIkey = 'your-api-key-here';
Open the App:

Open index.html in your web browser to view and use the app.
Testing
Local Testing:

Open the index.html file in a web browser.
Enter different city names to ensure the app fetches and displays weather data correctly.
Check the browser console for any errors.
Cross-Browser Testing:

Test the application in different browsers (Chrome, Firefox, Safari, Edge) to ensure compatibility.
Check the responsiveness of the app on different devices (desktop, tablet, mobile).
Deployment Testing:

Deploy the app to a web server and test the live version to ensure it works as expected.
# Known Bugs

Loading Indicator: The app does not currently display a loading indicator while fetching data.
Background Images: Some background images may not load correctly if the file names are incorrect or if the images are missing.
Credits
Code Used
Weather Icon URLs: Icons from OpenWeatherMap
Content
Weather data fetched from OpenWeatherMap API
Media
Icons: Icons sourced from Flaticon
# Acknowledgments

Thanks to OpenWeatherMap for providing the API.
Special thanks to Flaticon for the icons used in the app.
Inspiration and guidance from various online resources and tutorials.
