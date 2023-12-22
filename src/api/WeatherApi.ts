import axios from 'axios';

const API_KEY = '44c030a738004fc8808225601231012';

export const fetchWeatherData = async (location: string) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?q=${location}&days=2&key=${API_KEY}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

export const fetchCitySuggestions = async (location: string) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/search.json?q=${location}&key=${API_KEY}`,
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
};

export const getForecastForNextFiveHours = async (location: string) => {
  try {
    const forecastData = [];

    for (let i = 0; i < 5; i++) {
      const currentHour = new Date().getHours();
      const targetHour = currentHour + i;

      // Convert to 24-hour format
      const formattedHour = targetHour % 24;

      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${location}&hour=${formattedHour}&key=${API_KEY}`);

      // Add data to the array
      forecastData.push({
        hour: formattedHour,
        data: response.data,
      });
    }

    return forecastData;
  } catch (error) {
    throw new Error(`Error fetching forecast: ${error}`);
  }
};

export const getForecastForNextHours = (location: string) => {
  const forecastData: any[] | PromiseLike<any[]> = [];

  // Make API requests for the next five hours
  const promises = Array.from({ length: 5 }, (_, i) => {
    const currentHour = new Date().getHours();
    const targetHour = currentHour + i;
    const formattedHour = targetHour % 24;

    // Make the API request
    return axios
      .get(`https://api.weatherapi.com/v1/forecast.json?q=${location}&hour=${formattedHour}&key=${API_KEY}`)
      .then((response) => {
        // Add the forecast data to the array
        forecastData.push({
          hour: formattedHour,
          data: response.data,
        });
      });
  });

  // Wait for all promises to resolve
  return Promise.all(promises)
    .then(() => forecastData)
    .catch((error) => {
      throw new Error(`Error fetching forecast: ${error}`);
    });
};