const API_KEY = '801ac2cdb3eabc4ac8b4a3e66aabd2e7';
const searchForm = document.querySelector('searchForm');
const cityInput = document.querySelector('cityInput');
const currentWeatherDiv = document.querySelector('currentWeatherDiv');
const forecastDiv = document.querySelector('forecastDiv');
const historyList = document.querySelector('historyList');

let searchHistory = [];

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.log('Error fetching data:', error));
}

function displayWeatherData(data) {
    const city = data.city.name;
    const currentWeather = data.list[0];
    const forecast = data.list.slice(1, 6);

    currentWeatherDiv.innerHTML = `
    <h2>${city}</h2>
    <p>Date: ${currentWeather.dt_txt}</p>
    <p>Weather Icon: ${currentWeather.weather[0].icon}</p>
    <p>Temperature: ${currentWeather.main.temp}F</p>
    <p>Humidity: ${currentWeather.main.humidity}%</p>
    <p>Wind Speed: ${currentWeather.wind.speed} MPH</p>
    `;

    forecastDiv.innerHTML = `
    <h2>5-Day Forecast</h2>
    <ul>
        ${forecast.map(day => `
        <li>
            <p>Date: ${item.dt_txt}</p>
            <p>Weather Icon: ${item.weather[0].icon}</p>
            <p>Temperature: ${item.main.temp}F</p>
            <p>Humidity: ${item.main.humidity}%</p>
            <p>Wind Speed: ${item.wind.speed} MPH</p>
        </li>
        `).join('')}
    </ul>
    `;

    
}