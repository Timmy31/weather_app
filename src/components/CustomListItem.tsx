// HourlyItem.tsx
import React, {FC} from 'react';
import {Image} from 'react-native';
import {ListItem, makeStyles} from 'react-native-elements';

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
  const styles = customStyles();
  return (
    <ListItem key={time} containerStyle={styles.containerStyle}>
      <Image
        source={{
          uri: `https:${icon}`,
        }}
        style={styles.iconStyle}
      />
      <ListItem.Content>
        <ListItem.Title>{`${title}`}</ListItem.Title>
        <ListItem.Subtitle>{`${time}`}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Title>{`${`${temperature}°C`}`}</ListItem.Title>
    </ListItem>
  );
};

const customStyles = makeStyles(() => ({
  containerStyle: {
    paddingVertical: 10,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
}));
