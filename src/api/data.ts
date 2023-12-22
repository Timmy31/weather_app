import { CityProps, WeatherProps } from "../types";

export const mockWeatherDataList: WeatherProps = {
  location: {
    name: 'Berlin',
    country: 'Germany',
    localtime_epoch: 1703064349,
    localtime: '2023-12-20 10:25',
  },
  current: {
    temp_c: 5,
    condition: {
      text: 'Moderate rain',
      icon: '//cdn.weatherapi.com/weather/64x64/day/302.png',
      code: 1189,
    },
  },
  forecast: {
    forecastday: [
      {
        date: '2023-12-20',
        date_epoch: 1703030400,
        day: {
          maxtemp_c: 6,
          mintemp_c: 4.3,
          avgtemp_c: 5.6,
          condition: {
            text: 'Patchy rain possible',
            icon: '//cdn.weatherapi.com/weather/64x64/day/176.png',
            code: 1063,
          },
          uv: 2,
        },
        hour: [
          {
            time_epoch: 1703026800,
            time: '2023-12-20 00:00',
            temp_c: 6.5,
            condition: {
              text: 'Light drizzle',
              icon: '//cdn.weatherapi.com/weather/64x64/night/266.png',
              code: 1153,
            },
            cloud: 100,
            feelslike_c: 3.2,
            humidity: 94,
            uv: 1,
          }
        ]
      }
    ]
  }
}

 export const mockCitySuggestionsList: CityProps = { 
    id: 1, 
    name: 'City1',
    country: 'Country1', 
    region: 'Region1', 
    lat: '123234', 
    log: '12334' 
};