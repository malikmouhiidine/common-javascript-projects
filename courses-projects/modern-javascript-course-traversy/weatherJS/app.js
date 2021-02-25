// init Local Storage
const storage = new LStorage();
// init UI object
const ui = new UI();
// init weather object
const weather = new Weather(storage.getLocationData());

document.addEventListener("DOMContentLoaded", getWeather());

document.getElementById("w-change-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value;
  weather.changeLocation(city);
  storage.setLocationData(city);
  getWeather();
  $("#locModal").modal("hide");
});

function getWeather() {
  weather
    .getWeather()
    .then((data) => {
      // load data to the ui
      ui.paint(data);
    })
    .catch((err) => console.log(err));
}

// * Not to be confused There is two methods(functions) with the name " getWeather() "  one is in this file getWeather() and other from the weather class  weather.getWeather()
