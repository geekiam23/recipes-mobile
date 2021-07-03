import 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, act} from '@testing-library/react-native';
import moxios from 'moxios';

import HomeScreen from '../src/containers/HomeScreen';
import {testData} from '../src/lib/testing/testData';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Home Screen', () => {
  beforeEach(function () {
    moxios.install();
  });
  afterEach(function () {
    moxios.uninstall();
  });
  it('displays the correct amount of recipes and correct info', async () => {
    const {getByText, getAllByTestId} = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );
    await moxios.wait(jest.fn);
    await act(async () => {
      const request = moxios.requests.mostRecent();
      await request.respondWith({
        status: 200,
        response: testData(),
      });
    });
    expect(getAllByTestId('recipes')).toHaveLength(4);
    expect(getAllByTestId('heart-icon')).toHaveLength(4);
    expect(getByText('Bananas Foster Ice Cream')).toBeTruthy();
    expect(getByText('5-Minute Rocky Road Fudge')).toBeTruthy();
  });
});
