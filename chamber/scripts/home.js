const membersUrl = "data/members.json";

// ===== Navigation / Footer =====
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuButton.classList.toggle("open");
});

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

// ===== Weather =====
const currentTemp = document.querySelector("#currentTemp");
const weatherDesc = document.querySelector("#weatherDesc");
const weatherIcon = document.querySelector("#weatherIcon");
const forecastContainer = document.querySelector("#forecastContainer");

const lat = -8.0476;
const lon = -34.877;
const apiKey = "9d25026d8678dc974c1b4626c3903e28";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

function getCustomIcon(iconCode) {
  const iconMap = {
    "01d": "sun.svg",
    "01n": "moon.svg",
    "02d": "partly-cloudy.svg",
    "02n": "partly-cloudy.svg",
    "03d": "cloud.svg",
    "04d": "cloud.svg",
    "09d": "rain.svg",
    "10d": "rain.svg",
    "11d": "storm.svg",
    "13d": "cloud.svg",
    "50d": "fog.svg",
  };

  return iconMap[iconCode] || "partly-cloudy.svg";
}

async function getWeather() {
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl),
    ]);

    if (!currentResponse.ok) {
      throw new Error(`Current weather error: ${currentResponse.status}`);
    }

    if (!forecastResponse.ok) {
      throw new Error(`Forecast error: ${forecastResponse.status}`);
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);
  } catch (error) {
    console.error("Error loading weather data:", error);
    currentTemp.textContent = "Unavailable";
    weatherDesc.textContent = "Weather data could not be loaded.";

    if (weatherIcon) {
      weatherIcon.style.display = "none";
    }

    forecastContainer.innerHTML = "<p>Forecast unavailable.</p>";
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  const customIcon = getCustomIcon(icon);

  currentTemp.textContent = `${temp}°C`;
  weatherDesc.textContent = capitalizeWords(description);

  if (weatherIcon) {
    weatherIcon.src = `images/weather/${customIcon}`;
    weatherIcon.alt = capitalizeWords(description);
    weatherIcon.style.display = "block";
  }
}

function displayForecast(data) {
  forecastContainer.innerHTML = "";

  const filteredForecast = data.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 3);

  filteredForecast.forEach((item) => {
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-item");

    const date = new Date(item.dt_txt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const temp = Math.round(item.main.temp);

    forecastCard.innerHTML = `
      <p class="forecast-day">${dayName}</p>
      <p class="forecast-temp">${temp}°C</p>
    `;

    forecastContainer.appendChild(forecastCard);
  });
}

function capitalizeWords(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

// ===== Spotlights =====
const spotlightContainer = document.querySelector("#spotlightContainer");

async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const members = await response.json();

    const eligibleMembers = members.filter(
      (member) => member.membership === 2 || member.membership === 3,
    );

    const shuffledMembers = shuffleArray([...eligibleMembers]);
    const spotlights = shuffledMembers.slice(0, getSpotlightCount());

    displaySpotlights(spotlights);
  } catch (error) {
    console.error("Error loading spotlight data:", error);
    spotlightContainer.innerHTML =
      "<p>Spotlight members could not be loaded.</p>";
  }
}

function displaySpotlights(members) {
  spotlightContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("spotlight-card");

    const membershipLabel =
      member.membership === 3 ? "Gold Member" : "Silver Member";

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="80">
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      <p><strong>${membershipLabel}</strong></p>
    `;

    spotlightContainer.appendChild(card);
  });
}

function getSpotlightCount() {
  return window.innerWidth >= 1024 ? 3 : 2;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

getWeather();
getSpotlights();
