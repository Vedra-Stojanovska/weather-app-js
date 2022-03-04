//get the elements from the HTML
let searchBar = document.getElementById("search");
let button = document.getElementById("enter");
let heading = document.getElementById("heading");
let temp = document.getElementById("temp");
let headingThree = document.getElementById("headingThree");
let description = document.getElementsByClassName("description")[0];
let humidity = document.getElementsByClassName("humidity")[0];
let wind = document.getElementsByClassName("wind")[0];
let icon = document.getElementById("icon");
let buttonSwitchC = document.getElementById("toggleC");
let buttonSwitchF = document.getElementById("toggleF");

//constructor function

class City {
  constructor({ name, main, weather, wind }) {
    this.name = name;
    this.main = main;
    this.weather = weather;
    this.wind = wind;
  }
  static create(response) {
    return new City(response);
  }
  showData() {
    searchBar.value = "";
    heading.textContent = `Weather in ${this.name}`;
    temp.textContent = `${Math.floor(this.main.temp)}°C`;
    headingThree.textContent = `Feels like: ${Math.floor(
      this.main.feels_like
    )}°C`;
    buttonSwitchF.addEventListener("click", () => {
      temp.textContent = `${(Math.floor(this.main.temp) * 9) / 5 + 32}°F`;
      headingThree.textContent = `Feels like: ${
        Math.floor(this.main.feels_like * 9) / 5 + 32
      }°F`;
    });
    buttonSwitchC.addEventListener("click", () => {
      temp.textContent = `${Math.floor(this.main.temp)}°C`;
      headingThree.textContent = `Feels like: ${Math.floor(
        this.main.feels_like
      )}°C`;
    });
    icon.src =
      "http://openweathermap.org/img/w/" + this.weather[0].icon + ".png";
    description.textContent = this.weather[0].description;
    humidity.textContent = `Humidity: ${this.main.humidity}%`;
    wind.textContent = `Wind speed: ${this.wind.speed} km/h`;
  }
}

//function to get the API data
let storeData = async (city) => {
  return (
    await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=85005f96ed02e50e4c1697b861c0b087&units=metric"
    )
  ).json();
};

//function to call the storeData function and later call it with the button
let weatherAlert = async () => {
  try {
    let value = await storeData(searchBar.value);
    let city = City.create(value);
    city.showData();
    // return value;
  } catch (err) {
    encounterError();
  }
};

//refresh our HTML elements
let encounterError = () => {
  heading.textContent = "Nothing found";
  temp.textContent = "";
  headingThree.textContent = "";
  description.textContent = "";
  humidity.textContent = "";
  wind.textContent = "";
  icon.src = "";
};

button.addEventListener("click", weatherAlert);
