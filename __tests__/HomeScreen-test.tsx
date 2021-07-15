import 'react-native';
import React from 'react';

import {HomeScreen} from 'containers';
import {renderWithAuthWrapper} from 'lib/testing/renderHelper';
import {testData} from 'lib/testing/testData';
import {loadRecipes as mockLoadRecipes} from 'services/spoonacular';
import {waitFor} from '@testing-library/react-native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('../src/services/firebase.js');
jest.mock('../src/services/spoonacular.js');

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: mockedNavigate}),
}));

describe('Home', () => {
  it("renders user's favorite recipe", async () => {
    mockLoadRecipes.mockResolvedValueOnce([testData().recipes[0]]);

    const {getByText} = renderWithAuthWrapper(<HomeScreen />, {
      currentUser: {
        favRecipes: [634237],
      },
    });

    await waitFor(() => {
      expect(getByText('Bananas Foster Ice Cream')).toBeTruthy();
      expect(mockLoadRecipes).toBeCalledWith('634237');
    });
  });

  it("renders user's favorite recipes", async () => {
    mockLoadRecipes.mockResolvedValueOnce(testData().recipes);

    const {getByText} = renderWithAuthWrapper(<HomeScreen />, {
      currentUser: {
        favRecipes: [634237, 2222, 22, 78978],
      },
    });

    await waitFor(() => {
      expect(getByText('Bananas Foster Ice Cream')).toBeTruthy();
      expect(getByText('5-Minute Rocky Road Fudge')).toBeTruthy();
      expect(getByText('Red Kidney Bean Jambalaya')).toBeTruthy();
      expect(getByText("Jean's Seafood Gumbo")).toBeTruthy();
      expect(getByText('How to Make the Best Chicken Jambalaya')).toBeTruthy();
      expect(mockLoadRecipes).toBeCalledWith('634237,2222,22,78978');
    });
  });

  it('does not render if currentUser is missing', async () => {
    mockLoadRecipes.mockResolvedValueOnce(testData().recipes);

    const {queryByText} = renderWithAuthWrapper(<HomeScreen />, {
      currentUser: null,
    });

    await waitFor(() => {
      expect(queryByText('Bananas Foster Ice Cream')).toBeFalsy();
      expect(mockLoadRecipes).not.toBeCalledWith('634237, 2222, 22, 78978');
    });
  });
});
