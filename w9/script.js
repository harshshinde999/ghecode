// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');

// Event Listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Search weather function using AJAX
function getWeather() {
    const city = cityInput.value.toLowerCase().trim();

    if (!city) {
        weatherInfo.innerHTML = '<p class="error-message">Please enter a city name</p>';
        return;
    }

    // Show loading message
    weatherInfo.innerHTML = '<p>Loading weather data...</p>';

    // Create XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('GET', 'weather-data.json', true);

    // Set up event handler for when the request completes
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                // Parse the weather data
                const weatherData = JSON.parse(xhr.responseText);
                
                if (weatherData[city]) {
                    const data = weatherData[city];
                    weatherInfo.innerHTML = `
                        <div class="weather-card">
                            <h2>${city.charAt(0).toUpperCase() + city.slice(1)}</h2>
                            <div class="weather-details">
                                <p><strong>Temperature:</strong> ${data.temperature}</p>
                                <p><strong>Humidity:</strong> ${data.humidity}</p>
                                <p><strong>Conditions:</strong> ${data.conditions}</p>
                            </div>
                        </div>
                    `;
                } else {
                    weatherInfo.innerHTML = '<p class="error-message">City not found in our database</p>';
                }
            } catch (error) {
                weatherInfo.innerHTML = '<p class="error-message">Error processing weather data</p>';
            }
        } else {
            weatherInfo.innerHTML = '<p class="error-message">Error fetching weather data</p>';
        }
    };

    // Handle network errors
    xhr.onerror = function() {
        weatherInfo.innerHTML = '<p class="error-message">Network error occurred</p>';
    };

    // Send the request
    xhr.send();
}

// Display weather information
function displayWeather(city, weather) {
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    
    weatherInfo.innerHTML = `
        <div class="weather-card">
            <h2>${cityName} ${weather.icon}</h2>
            <div class="weather-details">
                <div class="detail">
                    <span class="label">Temperature:</span>
                    <span class="value">${weather.temperature}°C</span>
                </div>
                <div class="detail">
                    <span class="label">Humidity:</span>
                    <span class="value">${weather.humidity}%</span>
                </div>
                <div class="detail">
                    <span class="label">Condition:</span>
                    <span class="value">${weather.condition}</span>
                </div>
            </div>
        </div>
    `;
}

// Show error message
function showError(message) {
    weatherInfo.innerHTML = `
        <div class="error-message">
            ${message}
        </div>
    `;
} 