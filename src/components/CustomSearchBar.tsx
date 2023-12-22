import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CityProps } from '../types';
import { makeStyles } from 'react-native-elements';

interface CustomSearchBarProps {
  fetchSuggestionList: (text: string) => void;
  handleSearch: (text: string) => void;
  onPressSearch: () => void;
  suggestions: CityProps[] | undefined;
}

export const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  fetchSuggestionList,
  handleSearch,
  onPressSearch,
  suggestions,
}) => {

  const renderItem = ({ item }: { item: CityProps }) => (
    <TouchableOpacity
      style={customStyles.suggestionItem}
      testID={`search-suggestion-list-${item.id}`}
      onPress={() => {
        handleSearch(item.region);
        onPressSearch();
      }}>
      <Text>
        {item.name}, {item.country}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={customStyles.container}>
      <TextInput
        style={customStyles.input}
        placeholder="Search location..."
        onChangeText={searchCity => {
          fetchSuggestionList(searchCity);
          handleSearch(searchCity);
        }}
        onSubmitEditing={onPressSearch}
        testID={'search-input'}
      />
      <TouchableOpacity style={customStyles.iconContainer} onPress={onPressSearch} testID={'search-button'}>
        <Ionicons name="search" size={20} color="#999" testID={'search-icon'} />
      </TouchableOpacity>
      <FlatList
        style={customStyles.suggestionList}
        data={suggestions}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const customStyles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 8,
    zIndex: 9,
  },
  input: {
    flex: 1,
    marginHorizontal: 16,
  },
  iconContainer: {
    padding: 8,
  },
  suggestionList: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 3,
    maxHeight: 250,
    overflow: 'scroll',
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
