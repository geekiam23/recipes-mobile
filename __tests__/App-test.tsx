import 'react-native';
import React from 'react';
import App from '../App';
import {renderWithAllWrapper} from 'lib/testing/renderHelper';

const navigate = jest.fn();

describe('App', () => {
  it('renders HomeScreen when currentUser is available', () => {
    const {getByText} = renderWithAllWrapper(<App navigation={{navigate}} />, {
      currentUser: true,
    });

    expect(getByText('Recipes')).toBeTruthy();
  });
  it('renders LoginScreen when currentUser is not available', () => {
    const {getByText} = renderWithAllWrapper(<App navigation={{navigate}} />, {
      currentUser: false,
    });

    expect(getByText('Welcome back')).toBeTruthy();
  });
});
