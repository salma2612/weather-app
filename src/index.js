function addZero(x) {
  if (x < 10) {
    x = "0" + x;
  }
  return x;
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = addZero(now.getMinutes());

let date = document.querySelector(".date");
date.innerHTML = `${day} ${hour}:${minutes}`;

function form(event) {
  event.preventDefault();
  let search = document.querySelector("#searchcity");
  //let city = document.querySelector(".city");
  //city.innerHTML = search.value;
  //console.log(search.value);
  let cityname = search.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`;

  axios.get(url).then(getapi);
}

let go = document.querySelector("form");
go.addEventListener("submit", form);

function getapi(location) {
  let cityLocation = location.data.name;
  let currentCity = document.querySelector(".city");
  currentCity.innerHTML = cityLocation;

  let roundedtemp = Math.round(location.data.main.temp);
  let changedtemp = document.getElementById("changedTemp");
  changedtemp.innerHTML = ` ${roundedtemp}&deg `;

  let description = location.data.weather[0].description;
  let weatherDescription = document.querySelector("h2");
  weatherDescription.innerHTML = description;

  //let city = document.querySelector(".city"); city.innerHTML = location.data.name;
}

let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";

function navigate() {
  navigator.geolocation.getCurrentPosition(getposition);
}
let locateB = document.querySelector(".locateB");
locateB.addEventListener("click", navigate);

function getposition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getapi);
}
//let navigate = navigator.geolocation.getCurrentPosition(getposition);

//let cityname = "go";
//let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`;

//axios.get(url).then(getapi)
