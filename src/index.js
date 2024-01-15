function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");

  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let sensationElement = document.querySelector("#thermal-sensation");
  let sensation = response.data.temperature.feels_like;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  console.log(response.data);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  temperatureElement.innerHTML = Math.round(temperature);
  windElement.innerHTML = response.data.wind.speed;
  sensationElement.innerHTML = Math.round(sensation);
  iconElement.innerHTML = `
    <img src="${response.data.condition.icon_url}"
      class="weather-app-icon"
    />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "0t02509c5159bfa0f925o3abcad4776b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="weather-days">
  <div class="row">
    <div class="col-2">
      <div class="weather-days-date">${day}</div>
      <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png"
        alt=""
        width="80px"
      />
      <div class="weather-days-temperature">
        <span class="weather-days-temperature-maximum">
          <strong>18°</strong>
        </span>
        <span class="weather-days-temperature-minimum"> 12°</span>
      </div>
      </div>
    </div>
  </div>
`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Dresden");
displayForecast();
