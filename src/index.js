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

  roundedtemp = Math.round(location.data.main.temp);
  let changedtemp = document.getElementById("changedTemp");
  changedtemp.innerHTML = ` ${roundedtemp}&deg `;

  let description = location.data.weather[0].description;
  let weatherDescription = document.querySelector("h2");
  weatherDescription.innerHTML = description;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind speed: ${location.data.wind.speed} km/h`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${location.data.main.humidity}%`;
  //let city = document.querySelector(".city"); city.innerHTML = location.data.name;
  console.log(location.data);

  let icon = document.querySelector(".icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${location.data.weather[0].icon}@2x.png`
  );
}

let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
let roundedtemp = null; //created temperature variable as global variable so it can be accessed everywhere to make unit conversion to f and c easier

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
let f = document.querySelector("#f");
f.addEventListener("click", flink);

let c = document.querySelector("#c");
c.addEventListener("click", clink);


function clink(event) {
  event.preventDefault();
  //add active class on celsius and remove it on fahrenhight
  f.classList.remove("active");
  c.classList.add("active");
  let ctemp = document.querySelector("#changedTemp");
  ctemp.innerHTML = `${roundedtemp}&deg`;
}


function flink(event) {
  event.preventDefault();
//remove active class on celsius and add it to fahrenhight
  c.classList.remove("active");
  f.classList.add("active");
  let ftemp = document.querySelector("#changedTemp");
  let fconvert = Math.round((roundedtemp * 9) / 5 + 32);
  ftemp.innerHTML = `${fconvert}&deg`;
}


