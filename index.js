const cityInput = document.getElementById("cityName");
const errorMsg = document.getElementById("errorMsg");
//const empty = document.getElementById("empty");
const weatherCard = document.getElementById('weatherCard');
const api_id = 'b8e037ee19c502f7df92df3af06b0987';

const empty = document.createElement("p");
empty.textContent = 'Enter a City Name to Display Weather Details';
empty.id = 'empty';
weatherCard.appendChild(empty);

function getWeatherItemDetails(cityName, weatherItem) {
    console.log(cityName);
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${day}-${month}`;

    console.log(formattedDate);

    const temperature = `${(weatherItem.main.temp - 273.15).toFixed(2)}°C`;
    const speed = `${weatherItem.wind.speed} M/S`;
    const humidity = ` ${weatherItem.main.humidity}%`;
    const cloudImage = `https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`;
    const cloudDescription = `${weatherItem.weather[0].description}`;

    /////////////////
    const detailsContainer = document.createElement("div");
    weatherCard.appendChild(detailsContainer);
    //creating h1 elements
    const cityNameEl = document.createElement("h1");
    cityNameEl.classList.add('cityname');
    cityNameEl.textContent = `${cityName.toUpperCase()} (${formattedDate})`;
    detailsContainer.appendChild(cityNameEl);
    //creating Temperature p
    const temperatureEl = document.createElement("p");
    temperatureEl.classList.add("weather-info");
    temperatureEl.textContent = `Temperature: ${temperature}`;
    detailsContainer.appendChild(temperatureEl);
    //creating wind
    const speedEl = document.createElement("p");
    speedEl.classList.add("weather-info");
    speedEl.textContent = `Speed: ${speed}`;
    detailsContainer.appendChild(speedEl);
    //createingh humidity p 

    const humidityEl = document.createElement("p");
    humidityEl.classList.add('weather-info');
    humidityEl.textContent = `Humidity: ${humidity}`;
    detailsContainer.appendChild(humidityEl);

    //creating icon container 
    const iconContainer = document.createElement("div");
    weatherCard.appendChild(iconContainer);
    //creating image 
    const cloudImageEl = document.createElement("img");
    cloudImageEl.classList.add("cloud-image");
    cloudImageEl.setAttribute("alt", "Weather Image");
    cloudImageEl.src = cloudImage;
    iconContainer.appendChild(cloudImageEl);

    //creating cloud name 
    const cloudDetails = document.createElement("p");
    cloudDetails.classList.add('weather-info');
    cloudDetails.textContent = cloudDescription;
    iconContainer.appendChild(cloudDetails);

}

const getWeatherDetails = async () => {
    weatherCard.textContent = '';
    const cityName = cityInput.value;
    if (cityName !== '') {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_id}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            weatherCard.appendChild(empty);
            errorMsg.textContent = '*City Not Found';
            //empty.textContent = 'Enter a City Name to get Weather Details';
        } else {
            errorMsg.textContent = '';
            cityInput.value = '';
            // empty.textContent = '';
            weatherCard.textContent = '';
            console.log(data);
            getWeatherItemDetails(cityName, data);
        }
    }
};

const search = document.getElementById("search");
search.addEventListener("click", getWeatherDetails)
cityInput.addEventListener("keyup", e => e.key === "Enter" && getWeatherDetails());