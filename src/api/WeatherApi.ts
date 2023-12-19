import axios from 'axios';

const API_KEY = '44c030a738004fc8808225601231012';

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=1&key=${API_KEY}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};
