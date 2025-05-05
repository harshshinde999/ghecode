// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');

// Event Listeners
searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Search weather function
function searchWeather() {
    const city = cityInput.value.trim().toLowerCase();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    // Simulate AJAX delay
    setTimeout(() => {
        const weather = weatherData[city];
        
        if (weather) {
            displayWeather(city, weather);
        } else {
            showError('City not found in our database');
        }
    }, 500); // Simulate network delay
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