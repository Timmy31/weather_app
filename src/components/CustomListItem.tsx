// HourlyItem.tsx
import React, { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

interface CustomListItemProps {
  title: string;
  time: string;
  icon: string;
  temperature: number;
}

export const CustomListItem: FC<CustomListItemProps> = ({
  title,
  time,
  icon,
  temperature,
}) => {
  return (
    <ListItem key={time} containerStyle={customStyles.containerStyle}>
      <Image
        source={{
          uri: `https:${icon}`,
        }}
        style={customStyles.iconStyle}
      />
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{time}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Title>{`${temperature}°C`}</ListItem.Title>
    </ListItem>
  );
};

const customStyles = StyleSheet.create({
  containerStyle: {
    paddingVertical: 10,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
});
