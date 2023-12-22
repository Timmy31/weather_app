import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { fetchWeatherData, fetchCitySuggestions } from './WeatherApi';
import { WeatherProps, CityProps } from '../types';
import { mockCitySuggestionsList, mockWeatherDataList } from './data';
const API_KEY = '44c030a738004fc8808225601231012';

jest.mock('axios');

describe('API Functions', () => {
  const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchWeatherData', () => {
    it('fetches weather data successfully', async () => {
      const location = 'Berlin';
      const mockWeatherData: WeatherProps = mockWeatherDataList;
      mockAxiosGet.mockResolvedValue({ data: mockWeatherData } as AxiosResponse);

      const result = await fetchWeatherData(location);

      expect(result).toEqual(mockWeatherData);
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `https://api.weatherapi.com/v1/forecast.json?q=${location}&days=2&key=${API_KEY}`
      );
    });

    it('handles errors during weather data fetch', async () => {
      const location = 'InvalidLocation';
      const errorMessage = 'Network error';
      mockAxiosGet.mockRejectedValue(new Error(errorMessage));

      const result = await fetchWeatherData(location);

      expect(result).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith('Error fetching weather data:', expect.any(Error));
    });
  });

  describe('fetchCitySuggestions', () => {
    it('fetches city suggestions successfully', async () => {
      const location = 'Ber';
      const mockCitySuggestions: CityProps = mockCitySuggestionsList;
      mockAxiosGet.mockResolvedValue({ data: mockCitySuggestions } as AxiosResponse);

      const result = await fetchCitySuggestions(location);

      expect(result).toEqual(mockCitySuggestions);
      expect(mockAxiosGet).toHaveBeenCalledWith(
        `https://api.weatherapi.com/v1/search.json?q=${location}&key=${API_KEY}`
      );
    });

    it('handles errors during city suggestions fetch', async () => {
      const location = 'InvalidLocation';
      const errorMessage = 'Network error';
      mockAxiosGet.mockRejectedValue(new Error(errorMessage));

      const result = await fetchCitySuggestions(location);

      expect(result).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith('Error fetching suggestions:', expect.any(Error));
    });
  });
});
