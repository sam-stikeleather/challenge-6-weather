const API_KEY = '801ac2cdb3eabc4ac8b4a3e66aabd2e7';
const searchForm = document.querySelector('#searchForm');
const cityInput = document.querySelector('#cityInput');
const currentWeatherDiv = document.querySelector('#currentWeather');
const forecastDiv = document.querySelector('#forecast');
const historyList = document.querySelector('#historyList');

let searchHistory = [];

function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
  console.log('Fetching data for: ', city);

  fetch(apiUrl)
    .then((response) => response.json())
    .then(data => displayWeatherData(data))
    .catch(error => console.log('Error fetching data:', error));
}

function displayWeatherData(data) {
  const city = data.name; // Use data.name to get the city name for current weather
  const currentWeather = data;
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
      ${forecast.map(item => `
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

  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
  displaySearchHistory();
}

function displaySearchHistory() {
  historyList.innerHTML = searchHistory.map(city => `<li><button onclick="searchFromHistory('${city}')">${city}</button></li>`).join('');
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
