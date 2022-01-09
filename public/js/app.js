// Get Weather data

const weatherForm = document.querySelector("#WeatherForm");
const search = document.querySelector("#address");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  msg1.textContent = "Loading...";
  msg2.textContent = " ";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
        msg2.textContent = " ";
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
      }
    });
  });
});
