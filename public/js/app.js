// Get Weather data

const weatherForm = document.getElementById("WeatherForm");
const search = document.getElementById("address");
const msg1 = document.getElementById("msg1");
const msg2 = document.getElementById("msg2");

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
