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