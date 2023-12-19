import React, {FC, useEffect, useState} from 'react';
import {Text, Image, View} from 'react-native';
import {makeStyles} from 'react-native-elements';

export const WeatherScreen: FC = () => {
  const styles = customStyles();
  return (
    <View>
      <Text>WEATHER APP</Text>
    </View>
  );
};

const customStyles = makeStyles(({colors}) => ({
  container: {
    marginBottom: 40,
  },
}));
