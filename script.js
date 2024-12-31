// Event listeners for buttons
document.getElementById('getWeatherBtn').addEventListener('click', getWeatherByLocation);
document.getElementById('retryBtn').addEventListener('click', getWeatherByLocation);
document.getElementById('searchWeatherBtn').addEventListener('click', getWeatherBySearch);

// Function to fetch weather data by geolocation
function getWeatherByLocation() {
    // Show loading message
    document.getElementById('loading').style.display = 'block';
    document.getElementById('retryBtn').style.display = 'none'; // Hide retry button

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            showPosition, // Success callback
            handleError   // Error callback
        );
    } else {
        alert("Geolocation is not supported by this browser.");
        document.getElementById('loading').style.display = 'none'; // Hide loading message
    }
}

// Function to fetch weather data by search input
function getWeatherBySearch() {
    const location = document.getElementById('locationInput').value.trim();
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    // Show loading message
    document.getElementById('loading').style.display = 'block';
    document.getElementById('retryBtn').style.display = 'none'; // Hide retry button

    const apiKey = '0e8d1f839b9da92195e06a386d08ed89'; // Replace with your OpenWeatherMap API key
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displaySearchWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Could not retrieve current weather data. Please try again later.');
        });

    // Fetch 5-day forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Could not retrieve forecast data. Please try again later.');
        })
        .finally(() => {
            document.getElementById('loading').style.display = 'none'; // Hide loading message
        });
}

// Function to handle geolocation errors
function handleError(error) {
    document.getElementById('loading').style.display = 'none'; // Hide loading message

    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Please allow access to your location to use this feature.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable. Please try again.");
            break;
        case error.TIMEOUT:
            alert("The request to get your location timed out. Please try again.");
            break;
        default:
            alert("An unknown error occurred. Please try again.");
    }

    // Show the retry button
    document.getElementById('retryBtn').style.display = 'block';
}

// Function to display weather data
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = '0e8d1f839b9da92195e06a386d08ed89'; // Replace with your OpenWeatherMap API key
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Could not retrieve current weather data. Please try again later.');
        });

    // Fetch 5-day forecast
    fetch(forecastUrl)
        .then (response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Could not retrieve forecast data. Please try again later.');
        })
        .finally(() => {
            document.getElementById('loading').style.display = 'none'; // Hide loading message
        });
}

// Function to display current weather information
function displayWeather(data) {
    const weatherInfo = `
        <h2>Current Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
    document.getElementById('weatherInfo').innerHTML = weatherInfo;
}

// Function to display search weather information
function displaySearchWeather(data) {
    const weatherInfo = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
    document.getElementById('searchWeatherInfo').innerHTML = weatherInfo;
}

// Function to display 5-day forecast
function displayForecast(data) {
    let forecastHTML = '<h2>5-Day Forecast</h2>';
    const forecastList = data.list;

    // Loop through the forecast data and display it
    forecastList.forEach((forecast, index) => {
        if (index % 8 === 0) { // Display data for every 8th entry (every 3 hours)
            forecastHTML += `
                <div class="forecast-item">
                    <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
                    <p>Temperature: ${forecast.main.temp} °C</p>
                    <p>Weather: ${forecast.weather[0].description}</p>
                </div>
            `;
        }
    });

    document.getElementById('forecastInfo').innerHTML = forecastHTML;
}
// Function to display 5-day forecast
function displayForecast(data) {
    let forecastHTML = '<h2>5-Day Forecast</h2>';
    const forecastList = data.list;

    // Loop through the forecast data and display it
    forecastList.forEach((forecast, index) => {
        if (index % 8 === 0) { // Display data for every 8th entry (every 3 hours)
            forecastHTML += `
                <div class="forecast-item">
                    <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
                    <p>${forecast.main.temp} °C</p>
                    <p>${forecast.weather[0].description}</p>
                </div>
            `;
        }
    });

    document.getElementById('forecastInfo').innerHTML = forecastHTML;
}
// Function to fetch weather data by search input
function getWeatherBySearch() {
    const location = document.getElementById('locationInput').value.trim();
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    // Show loading message
    document.getElementById('loading').style.display = 'block';
    document.getElementById('retryBtn').style.display = 'none'; // Hide retry button

    const apiKey = '0e8d1f839b9da92195e06a386d08ed89'; // Replace with your OpenWeatherMap API key
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data); // Display current weather
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert(error.message || 'Could not retrieve current weather data. Please try again later.');
        });

    // Fetch 5-day forecast
    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Forecast data not available for this location.');
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data); // Display 5-day forecast
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert(error.message || 'Could not retrieve forecast data. Please try again later.');
        })
        .finally(() => {
            document.getElementById('loading').style.display = 'none'; // Hide loading message
        });
}

// Function to display current weather information
function displayWeather(data) {
    const weatherInfo = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
    document.getElementById('weatherInfo').innerHTML = weatherInfo;
}

// Function to display 5-day forecast
function displayForecast(data) {
    let forecastHTML = '<h2>5-Day Forecast</h2>';
    const forecastList = data.list;

    // Loop through the forecast data and display it
    forecastList.forEach((forecast, index) => {
        if (index % 8 === 0) { // Display data for every 8th entry (every 3 hours)
            forecastHTML += `
                <div class="forecast-item">
                    <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
                    <p>Temperature: ${forecast.main.temp} °C</p>
                    <p>Weather: ${forecast.weather[0].description}</p>
                </div>
            `;
        }
    });

    document.getElementById('forecastInfo').innerHTML = forecastHTML;
}