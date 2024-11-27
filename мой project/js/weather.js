const searchButton = document.querySelector("#search");
const searchInput = document.querySelector(".cityName");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");

const APP_ID = "e417df62e04d3b1b111abeab19cea714";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

searchButton.onclick = () => {
  fetch(
    `${BASE_URL}?appid=${APP_ID}&q=${searchInput.value}&units=metric&lang=RU`
  )
    .then((response) => response.json())
    .then((data) => {
      city.innerHTML = data.name || "Город не найден";
      temp.innerHTML = `
        <span>
          ${data.main?.temp ? Math.round(data.main?.temp) + "&deg;C" : ""}
        </span>
       <img src="https://openweathermap.org/img/w/${
         data.weather[0].icon
       }.png" alt="img">
`;
    });
};
