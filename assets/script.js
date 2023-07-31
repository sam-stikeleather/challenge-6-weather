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

