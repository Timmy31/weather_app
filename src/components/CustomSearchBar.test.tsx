import React from 'react';
import { create } from 'react-test-renderer';
import { act } from 'react-test-renderer';
import { CustomSearchBar } from './CustomSearchBar'; // Adjust the path based on your project structure

// Mocking the react-native-vector-icons library
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');

describe('CustomSearchBar Component', () => {
  const mockFetchSuggestionList = jest.fn();
  const mockHandleSearch = jest.fn();
  const mockOnPressSearch = jest.fn();

  const suggestions = [
    { id: 1, name: 'City1', country: 'Country1', region: 'Region1', lat: '123234', log: '12334' },
    { id: 2, name: 'City2', country: 'Country2', region: 'Region2', lat: '123232', log: '12332' },
  ];

  it('renders correctly', () => {
    const tree = create(
      <CustomSearchBar
        fetchSuggestionList={mockFetchSuggestionList}
        handleSearch={mockHandleSearch}
        onPressSearch={mockOnPressSearch}
        suggestions={suggestions}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls fetchSuggestionList and handleSearch on text input change', () => {
    const component = create(
      <CustomSearchBar
        fetchSuggestionList={mockFetchSuggestionList}
        handleSearch={mockHandleSearch}
        onPressSearch={mockOnPressSearch}
        suggestions={suggestions}
      />
    );

    const input = component.root.findByProps({ testID: 'search-input' });

    act(() => {
      input.props.onChangeText('City');
    });

    expect(mockFetchSuggestionList).toHaveBeenCalledWith('City');
    expect(mockHandleSearch).toHaveBeenCalledWith('City');
  });

  it('calls onPressSearch when the search button is pressed', () => {
    const component = create(
      <CustomSearchBar
        fetchSuggestionList={mockFetchSuggestionList}
        handleSearch={mockHandleSearch}
        onPressSearch={mockOnPressSearch}
        suggestions={suggestions}
      />
    );

    const button = component.root.findByProps({ testID: 'search-button' });

    act(() => {
      button.props.onPress();
    });

    expect(mockOnPressSearch).toHaveBeenCalled();
  });

  it('calls handleSearch and onPressSearch when a suggestion is pressed', () => {
    const component = create(
      <CustomSearchBar
        fetchSuggestionList={mockFetchSuggestionList}
        handleSearch={mockHandleSearch}
        onPressSearch={mockOnPressSearch}
        suggestions={suggestions}
      />
    );

    const suggestion = component.root.findByProps({ testID: 'search-suggestion-list-1' });

    act(() => {
      suggestion.props.onPress();
    });

    expect(mockHandleSearch).toHaveBeenCalledWith('City1');
    expect(mockOnPressSearch).toHaveBeenCalled();
  });
});
