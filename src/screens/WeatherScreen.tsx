import React, {FC, useEffect, useState} from 'react';
import {Text, Image, View} from 'react-native';
import {makeStyles} from 'react-native-elements';

// Components
import {CustomSearchBar, CustomListItem} from '../components';
// API
import {fetchCitySuggestions, fetchWeatherData} from '../api/WeatherApi';
// Types
import { CityProps, HourProps, WeatherProps } from '../types';
// Utils
import {formatTime, getHourFromTime} from '../utils/formatTime';

export const WeatherScreen: FC = () => {
  const styles = customStyles();

  const [city, setCity] = useState('Berlin');
  const [weatherData, setWeatherData] = useState<WeatherProps>();
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestions, setSuggestions] = useState<CityProps[]>([]);

  useEffect(() => {
    fetchWeatherData(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLocationSuggestions = async () => {
    try {
      const data = await fetchCitySuggestions(city);
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getWeatherData = async () => {
    setSuggestions([]);
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error);
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (searchQuery: string) => {
    setCity(searchQuery);
  };

  return (
    <View>
      <CustomSearchBar
        fetchSuggestionList={getLocationSuggestions}
        onPressSearch={getWeatherData}
        handleSearch={handleSearch}
        suggestions={suggestions}
      />
      {errorMessage ? (
        <View>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {weatherData && (
        <View style={styles.container}>
          <View style={styles.boxWrapper}>
            <Text>{`${weatherData.location.name}, ${weatherData.location.country}`}</Text>
            <View style={styles.currentWeatherIconWrapper}>
              <Image
                source={{
                  uri: `https:${weatherData.current.condition.icon}`,
                }}
                style={styles.currentIconStyle}
              />
              <Text style={styles.temperatureStyle}>
                {weatherData.current.temp_c} °C
              </Text>
              <Text>{weatherData.current.condition.text}</Text>
              <Text>{`Local Time: ${formatTime(
                weatherData.location.localtime_epoch,
              )}`}</Text>
            </View>
          </View>

          <View style={styles.boxWrapper}>
            <Text>{'Forecast for the next 5 hours:'}</Text>
            {weatherData.forecast.forecastday[0].hour
              .slice(1, 6)
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
      )}
    </View>
  );
};

const customStyles = makeStyles(({colors}) => ({
  container: {
    paddingBottom: 40,
  },
  errorText: {
    color: colors?.error,
    textAlign: 'center',
    padding: 16,
  },
  temperatureStyle: {
    fontSize: 34,
    color: colors.black,
  },
  boxWrapper: {
    backgroundColor: colors?.white,
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
}));
