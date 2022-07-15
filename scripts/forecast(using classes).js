class Forecast {
  constructor() {
    // properties
    this.key = "u9g5M01TuZq93nBIzDk7EE4LAa5br1xg";
    this.baseCityUri =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    this.baseWeatherUri =
      "http://dataservice.accuweather.com/currentconditions/v1/";
  }
  //   methods
  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return {
      cityDetails: cityDetails,
      weather: weather,
    };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;  
    const response = await fetch(this.baseCityUri + query);
    const data = await response.json();
    return data[0];
  }
  async getWeather(id) {
    const locationKey = `${id}`;
    const query = `?apikey=${this.key}`;
    const response = await fetch(this.baseWeatherUri + locationKey + query);
    const data = await response.json();
    return data;
  }
}
