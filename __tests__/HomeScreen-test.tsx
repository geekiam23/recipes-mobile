import 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {fireEvent, waitFor} from '@testing-library/react-native';
import {loadRandomRecipes as mockLoadRandomRecipes} from '../src/services/spoonacular';

import HomeScreen from '../src/containers/HomeScreen';
import {testData, testData2} from '../src/lib/testing/testData';
import {renderWithAllWrapper} from 'lib/testing/renderHelper';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('../src/services/spoonacular.js');

describe('Home Screen', () => {
  it('displays the correct amount of recipes and correct info', async () => {
    mockLoadRandomRecipes.mockResolvedValueOnce(testData().recipes);
    const {getByText, getAllByTestId} = renderWithAllWrapper(<HomeScreen />);

    await waitFor(() => {
      expect(getAllByTestId('recipes')).toHaveLength(5);
      expect(getAllByTestId('heart-icon')).toHaveLength(5);
      expect(getByText('Bananas Foster Ice Cream')).toBeTruthy();
      expect(getByText('5-Minute Rocky Road Fudge')).toBeTruthy();
      expect(getByText('Red Kidney Bean Jambalaya')).toBeTruthy();
      expect(getByText("Jean's Seafood Gumbo")).toBeTruthy();
      expect(getByText('How to Make the Best Chicken Jambalaya')).toBeTruthy();
    });
  });

  it('displays the correct amount of recipes when calling onEndReached', async () => {
    mockLoadRandomRecipes
      .mockResolvedValueOnce(testData().recipes)
      .mockResolvedValueOnce(testData2().recipes);

    const {getByText, getByTestId} = renderWithAllWrapper(<HomeScreen />);

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 100,
        },
        contentSize: {
          height: 385,
          width: 196,
        },
        layoutMeasurement: {
          height: 1200,
          width: 300,
        },
      },
    };

    await waitFor(() => {
      expect(getByText('Bananas Foster Ice Cream')).toBeTruthy();
      expect(getByText('5-Minute Rocky Road Fudge')).toBeTruthy();
      expect(getByText('Red Kidney Bean Jambalaya')).toBeTruthy();
      expect(getByText("Jean's Seafood Gumbo")).toBeTruthy();
      expect(getByText('How to Make the Best Chicken Jambalaya')).toBeTruthy();
      expect(mockLoadRandomRecipes).toBeCalledTimes(1);
    });

    await waitFor(() => {
      fireEvent.scroll(getByTestId('flat-list'), eventData);
      expect(getByText('Bananas Foster Ice Cream')).toBeTruthy();
      expect(getByText('5-Minute Rocky Road Fudge')).toBeTruthy();
      expect(getByText('Red Kidney Bean Jambalaya')).toBeTruthy();
      expect(getByText("Jean's Seafood Gumbo")).toBeTruthy();
      expect(getByText('How to Make the Best Chicken Jambalaya')).toBeTruthy();
      expect(getByText('Cornmeal-Crusted Catfish')).toBeTruthy();
      expect(getByText('Jambalaya Stew')).toBeTruthy();
      expect(mockLoadRandomRecipes).toBeCalledTimes(2);
    });
  });
});
