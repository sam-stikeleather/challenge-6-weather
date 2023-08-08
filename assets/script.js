const API_KEY = '801ac2cdb3eabc4ac8b4a3e66aabd2e7';
const searchForm = document.querySelector('#searchForm');
const cityInput = document.querySelector('#cityInput');
const currentWeatherDiv = document.querySelector('#currentWeather');
const forecastDiv = document.querySelector('#forecast');
const historyList = document.querySelector('#historyList');

let searchHistory = [];

function fetchWeatherData(city) {
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`;

  Promise.all([
    fetch(weatherApiUrl).then(response => response.json()),
    fetch(forecastApiUrl).then(response => response.json())
  ])
    .then(([weatherData, forecastData]) => {
      displayWeatherData(weatherData);
      displayForecastData(forecastData);
    })
    .catch(error => console.log('Error fetching data:', error));
}

function displayWeatherData(data) {
  const city = data.name;
  const currentWeather = data;

  // Display current weather
  currentWeatherDiv.innerHTML = `
    <h2>${city}</h2>
    <p>Date: ${currentWeather.dt_txt}</p>
    <p>Weather Icon: ${currentWeather.weather[0].icon}</p>
    <p>Temperature: ${currentWeather.main.temp}F</p>
    <p>Humidity: ${currentWeather.main.humidity}%</p>
    <p>Wind Speed: ${currentWeather.wind.speed} MPH</p>
  `;
}

function displayForecastData(data) {
  const forecast = data.list;
  const forecastList = document.getElementById("forecastList"); // Get the forecast list element

  // Populate the forecast list
  forecastList.innerHTML = forecast.map(item => `
    <li>
      <p>Date: ${item.dt_txt}</p>
      <p>Weather Icon: ${item.weather[0].icon}</p>
      <p>Temperature: ${item.main.temp}F</p>
      <p>Humidity: ${item.main.humidity}%</p>
      <p>Wind Speed: ${item.wind.speed} MPH</p>
    </li>
  `).join('');
}

function displaySearchHistory() {
  historyList.innerHTML = searchHistory.map(city => `
    <li><button onclick="searchFromHistory('${city}')">${city}</button></li>
  `).join('');
}

function searchFromHistory(city) {
  cityInput.value = city;
  fetchWeatherData(city);
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    fetchWeatherData(city);
  }
});

const storedHistory = localStorage.getItem('searchHistory');
if (storedHistory) {
  searchHistory = JSON.parse(storedHistory);
  displaySearchHistory();
}
