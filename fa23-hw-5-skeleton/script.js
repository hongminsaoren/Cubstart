// CLUE #0: See more info in the homework spec.
apiKey = "95bf8bd03bd9b868eb4fc8eb0a42cc7b";

geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q="; // This is beginning of the API call we use to convert city names to coordinates!
weatherUrl = "https://api.openweathermap.org/data/2.5/weather?"; //This is beginning of the API call we use to convert coordinates to weather!
submitButton = document.getElementById("submit");

// DOM Targetting: Select the input element with the id "cityName" (CLUE #1)
cityName = document.getElementById("cityName");
mainWeather = document.getElementById("mainWeather");
weatherDescription = document.getElementById("weatherDescription");

// This adds an event listener to check when the submit button is clicked,
// then if the cityName's value is not blank, we call setWeatherDescription with cityName.value as the argument.
submitButton.addEventListener("click", function () {
  if (cityName.value != "") {
    setWeatherDescription(cityName.value);
  }
});


// This function takes in a city name (that the user inputs), and gets the latitude and longitude
// of that city. This is important because our second API call, the one that actually gets the weather,
// requires a latitude and longitude coordinate pair.
async function getLatLon(city) {

  // Let's create the API url. (CLUE #2)
  let url = geocodingUrl + city + "&appid=" + apiKey;

  // Send a GET request to the url that you wrote above! (CLUE #3)
  let response = await fetch(url) //This line sends the GET request and waits for the response to come back.
  let data = await response.json() //This line parses the response into JSON format so we can use it!

  // Let's return a JavaScript object here! (CLUE #4)
  return {
    "lat": data[0]["lat"], 
    "lon": data[0]["lon"]
  }
}

//This function makes a GET request to retrieve weather data at a specific latitude and longitude.
// (CLUE #5)
async function getWeather(lat, lon) {
  let url = weatherUrl + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  let response = await fetch(url)
  let data = await response.json()

  // Return the main weather and weather description from the data variable! (CLUE #5.5)
  return {
    "main": data["weather"][0]["main"],
    "description": data["weather"][0]["description"]
  }
}

// This function gets the weather using the functions you wrote above and displays it in the HTML.
async function setWeatherDescription(city) {
  // This line calls getLatLon on the city name provided to find the latitude and longitude of that city.
  let coordinateData = await getLatLon(city)

  // Extract the lat and lon from coordinateData. (CLUE #6)
  const lat = coordinateData["lat"]
  const lon = coordinateData["lon"]


  let weatherData = await getWeather(lat, lon)
  
  // Same thing here, but we want to set mainWeather and weatherDescription's innerHTML to the relevant values in weatherData.
  // (CLUE #7)
  mainWeather.innerHTML = weatherData["main"]
  /* Set weatherDescription's innerHTML here */
  weatherDescription.innerHTML = weatherData["description"]
}
