const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
// creating a new instance of the forecast class
const forecast = new Forecast();

// to update the weather details in the DOM

const updateUI = (data) => {
  // destructuring the data object

  const { cityDetails, weather } = data;

  // update weather details template

  details.innerHTML = ` <h5 class="my-3 city-name">${cityDetails.EnglishName}</h5>
          <div class="my-3 weather-condition">${weather[0].WeatherText}</div>
          <div class="display-4 my-2">
            <span >${weather[0].Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
         
          `;

  // update night and day images..

  // checking if it's daytime or not
  let imageSrc = weather[0].IsDayTime
    ? "Images/blue-sky.jpg"
    : "Images/night-sky.jpg";

  // setting the source of the image to imageSrc
  time.setAttribute("src", imageSrc);

  // update icon
  const iconSrc = `Images/icons/${weather[0].WeatherIcon}.svg`;
  // setting the source of the icon to iconSrc
  icon.setAttribute("src", iconSrc);

  // removing the d-none (display:none) class from the card component on updates

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

// an async function that takes the city enterd by the user as an argument

cityForm.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();
  //   get user input value
  const city = cityForm.city.value.trim();
  //   to reset the input fields
  cityForm.reset();

  // since it is an async function and returns a promise we can use .then() and .catch() to handle success and failure cases.
  forecast
    .updateCity(city)
    .then((data) => {
      //  calling the updateUI function with the object returned by getCity as an argument
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });

  // set local storage
  localStorage.setItem("cityName", city);
});

// automatically the fetch the weather details of the last entered location

if (localStorage.getItem("cityName")) {
  // update the city with the value of the city in the local storage
  forecast
    .updateCity(localStorage.getItem("cityName"))
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
