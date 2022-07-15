// accuweather api key
const key = "u9g5M01TuZq93nBIzDk7EE4LAa5br1xg";

// to get city information
const getCity = async (city) => {
  // base api for city search from location api
  const baseApi =
    "http://dataservice.accuweather.com/locations/v1/cities/search";
  // query parameters
  // a query parameter begins with "?" and "&" to add on another query parameter
  const query = `?apikey=${key}&q=${city}`;
  // fetching the city details from the accuweather
  const response = await fetch(baseApi + query);
  // parsing the response object with json() method
  const data = await response.json();
  // the first element(ie. object) in the returned array is going to be the closest match.
  return data[0];
};

// to get weather information
// the function takes the locaton key returned by the getCity function as an argument
const getWeather = async (id) => {
  // base api for current conditions
  // the location key is appended directly to the base api rather than a query parameter
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const locationKey = `${id}`;
  const query = `?apikey=${key}`;
  // fetching the weather conditons from accuweather
  const response = await fetch(base + locationKey + query);
  const data = await response.json();
  return data;
};

const getForecasts = async (id) => {
  const base = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/";
  const locationKey = `${id}`;
  const query = `?apikey=${key}`;
  const response = await fetch(base + locationKey + query);
  const data = await response.json();
  return data;
};
