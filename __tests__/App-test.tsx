import 'react-native';
import React from 'react';

import App from '../App';
import {renderWithAllWrapper} from 'lib/testing/renderHelper';
import {testData} from 'lib/testing/testData';
import {loadFirestoreUser as mockloadFirestoreUser} from 'services/firebase';
import {loadRecipes as mockLoadRecipes} from 'services/spoonacular';
import {fireEvent, waitFor} from '@testing-library/react-native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('../src/services/firebase.js');
jest.mock('../src/services/spoonacular.js');

describe('App', () => {
  it('renders HomeScreen when currentUser is available', async () => {
    mockloadFirestoreUser.mockResolvedValueOnce([634237]);
    mockLoadRecipes.mockResolvedValueOnce(testData().recipes[0]);
    const {getByText, getByTestId} = renderWithAllWrapper(<App />, {
      currentUser: {
        favRecipes: [634237],
      },
    });

    await waitFor(() => {
      expect(getByText('My Recipes')).toBeTruthy();
      expect(getByTestId('dice-icon')).toBeTruthy();
      fireEvent.press(getByTestId('dice-icon'));
      expect(getByTestId('star-icon')).toBeTruthy();
    });
  });

  it('renders LoginScreen when currentUser is not available', () => {
    const {getByText} = renderWithAllWrapper(<App />, {
      currentUser: null,
    });

    expect(getByText('Welcome back')).toBeTruthy();
  });
});
