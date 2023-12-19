import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomSearchBar } from './CustomSearchBar';

describe('CustomSearchBar', () => {

  const mockFetchSuggestionList = jest.fn();
  const mockHandleSearch = jest.fn();
  const mockOnPressSearch = jest.fn();

  const suggestions = [
    {
      id: 1,
      name: 'Berlin',
      country: 'Germany',
    },
  ];

  const defaultProps = {
    fetchSuggestionList: mockFetchSuggestionList,
    handleSearch: mockHandleSearch,
    onPressSearch: mockOnPressSearch,
    suggestions: [],
  };

  it('renders CustomSearchBar correctly', () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <CustomSearchBar {...defaultProps} suggestions={suggestions} />
    );

    // Check that the input placeholder text is correct
    expect(getByPlaceholderText('Search location...')).toBeTruthy();

    // Check that the search icon is rendered
    expect(getByTestId('search-icon')).toBeTruthy();

    // Check that the suggestion list is initially not visible
    expect(() => getByText('Berlin, Germany')).toThrow();
  });

  it('handles text input and suggestions', () => {
    const { getByPlaceholderText, getByText } = render(
      <CustomSearchBar {...defaultProps} suggestions={suggestions} />
    );

    // Simulate user typing in the search input
    fireEvent.changeText(getByPlaceholderText('Search location...'), 'Berlin');

    // Assert that fetchSuggestionList and handleSearch were called with the correct arguments
    expect(mockFetchSuggestionList).toHaveBeenCalledWith('Berlin');
    expect(mockHandleSearch).toHaveBeenCalledWith('Berlin');

    // Check that the suggestion list becomes visible
    expect(getByText('Berlin, Germany')).toBeTruthy();
  });

  it('on item press', () => {
    const { getByPlaceholderText, getByText } = render(
      <CustomSearchBar {...defaultProps} suggestions={suggestions} />
    );

    // Simulate user typing in the search input
    fireEvent.changeText(getByPlaceholderText('Search location...'), 'Berlin');

    // Simulate pressing on a suggestion item
    fireEvent.press(getByText('Berlin, Germany'));

    // Assert that handleSearch and onPressSearch were called with the correct arguments
    expect(mockHandleSearch).toHaveBeenCalledWith('Berlin');
    expect(mockOnPressSearch).toHaveBeenCalled();
  });
});
