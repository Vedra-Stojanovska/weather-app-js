//get the elements from the HTML
let searchBar = document.getElementById("search");
let button = document.getElementById("enter");
let heading = document.getElementById("heading");
let headingTwo = document.getElementById("headingTwo");
let headingThree = document.getElementById("headingThree");
let description = document.getElementsByClassName("description")[0];
let humidity = document.getElementsByClassName("humidity")[0];
let wind = document.getElementsByClassName("wind")[0];
let icon = document.getElementById("icon");

//create a class for every city
class City {
  constructor(name, main, weather, wind) {
    this.name = name;
    this.main = main;
    this.weather = weather;
    this.wind = wind;
  }
}

//function to get the API data
let storeData = (city) => {
  return fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=85005f96ed02e50e4c1697b861c0b087&units=metric"
  )
    .then((response) => response.json())
    .then((response) => response);
};

//function to show the data from the API
let showData = (value) => {
  searchBar.value = "";
  //populate our objects from the class
  let city = new City(value.name, value.main, value.weather, value.wind);
  console.log(city);
  heading.innerHTML = `Weather in ${value.name}`;
  headingTwo.innerHTML = `${value.main.temp}°C`;
  headingThree.innerHTML = `Feels like: ${value.main.feels_like}°C`;
  icon.src =
    "http://openweathermap.org/img/w/" + value.weather[0].icon + ".png";
  description.innerHTML = value.weather[0].description;
  humidity.innerHTML = `Humidity: ${value.main.humidity}%`;
  wind.innerHTML = `Wind speed: ${value.wind.speed} km/h`;
};

//refresh our HTML elements
let encounterError = () => {
  heading.innerHTML = "Nothing found";
  headingTwo.innerHTML = "";
  headingThree.innerHTML = "";
  description.innerHTML = "";
  humidity.innerHTML = "";
  wind.innerHTML = "";
};

//function to call the storeData function and later call it with the button
let weatherAlert = () => {
  storeData(searchBar.value)
    .then((value) => showData(value))
    .catch((error) => encounterError());
};

button.addEventListener("click", weatherAlert);
