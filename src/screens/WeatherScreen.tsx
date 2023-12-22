import React, { FC, useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

// Components
import { CustomSearchBar, CustomListItem } from '../components';
// API
import { fetchCitySuggestions, fetchWeatherData } from '../api/WeatherApi';
// Types
import { CityProps, HourProps, WeatherProps } from '../types';
// Utils
import { formatTime, getHourFromTime } from '../utils/formatTime';

const WeatherScreen: FC = () => {

  const [location, setLocation] = useState('Berlin');
  const [weatherData, setWeatherData] = useState<WeatherProps>();
  const [suggestions, setSuggestions] = useState<CityProps[]>();
  const [errorMessage, setErrorMessage] = useState('No data avilable');

  useEffect(() => {
    getWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLocationSuggestions = async () => {
    if (location.length > 0) {
      try {
        const data = await fetchCitySuggestions(location);
        setSuggestions(data);
      } catch (error) {
      }
    }
  };

  const getWeatherData = async () => {
    setSuggestions(undefined);

    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      setLocation('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('There is no data available for the selected location!');
      setWeatherData(undefined);
    }
  };

  const handleSearch = (searchQuery: string) => {
    setLocation(searchQuery);
  };

  const getForcastNo = getHourFromTime(weatherData ? weatherData.location.localtime_epoch : 1);

  return (
    <View>
      <CustomSearchBar
        fetchSuggestionList={getLocationSuggestions}
        onPressSearch={getWeatherData}
        handleSearch={handleSearch}
        suggestions={suggestions}
      />
      {weatherData ? (
        <View style={customStyles.container}>
          <View style={customStyles.boxWrapper}>
            <Text>{`${weatherData.location.name}, ${weatherData.location.country}`}</Text>
            <View style={customStyles.currentWeatherIconWrapper}>
              <Image
                source={{
                  uri: `https:${weatherData.current.condition.icon}`,
                }}
                style={customStyles.currentIconStyle}
              />
              <Text style={customStyles.temperatureStyle}>
                {weatherData.current.temp_c} °C
              </Text>
              <Text>{weatherData.current.condition.text}</Text>
              <Text>{`Local Time: ${formatTime(
                weatherData.location.localtime_epoch,
              )}`}</Text>
            </View>
          </View>

          <View style={customStyles.boxWrapper}>
            <Text>{'Forecast for the next 5 hours:'}</Text>
            {weatherData.forecast.forecastday[0].hour
              .slice(getForcastNo + 1, getForcastNo + 6)
              .map((hour: HourProps) => (
                <CustomListItem
                  key={hour.time_epoch}
                  time={`${getHourFromTime(hour.time_epoch)}:00`}
                  temperature={hour.temp_c}
                  icon={hour.condition.icon}
                  title={hour.condition.text}
                />
              ))}
          </View>
        </View>
      ) :
        (<View><Text style={customStyles.errorText}>{errorMessage}</Text></View>)
      }
    </View>
  );
};

export default WeatherScreen;

const customStyles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: 16,
  },
  temperatureStyle: {
    fontSize: 34,
    color: 'black',
  },
  boxWrapper: {
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
  },
  currentWeatherIconWrapper: {
    alignItems: 'center',
  },
  currentIconStyle: {
    width: 80,
    height: 80,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
});
