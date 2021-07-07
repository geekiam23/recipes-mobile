import 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, act, fireEvent} from '@testing-library/react-native';
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
    expect(getAllByTestId('recipes')).toHaveLength(5);
    expect(getAllByTestId('heart-icon')).toHaveLength(5);
    expect(getByText('Bananas Foster Ice Cream')).toBeTruthy();
    expect(getByText('5-Minute Rocky Road Fudge')).toBeTruthy();
    expect(getByText('Red Kidney Bean Jambalaya')).toBeTruthy();
    expect(getByText("Jean's Seafood Gumbo")).toBeTruthy();
    expect(getByText('How to Make the Best Chicken Jambalaya')).toBeTruthy();
  });

  it.skip('displays the correct amount of recipes when calling onEndReached', async () => {
    const getRecipes = jest.fn();
    const {debug, getByText, getAllByTestId, getByTestId} = render(
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

    expect(getAllByTestId('recipes')).toHaveLength(5);
    expect(getAllByTestId('heart-icon')).toHaveLength(5);
    expect(getByText('Bananas Foster Ice Cream')).toBeTruthy();
    expect(getByText('5-Minute Rocky Road Fudge')).toBeTruthy();
    expect(getByText('Red Kidney Bean Jambalaya')).toBeTruthy();
    expect(getByText("Jean's Seafood Gumbo")).toBeTruthy();
    expect(getByText('How to Make the Best Chicken Jambalaya')).toBeTruthy();

    fireEvent.scroll(getByTestId('flat-list'), eventData);
    console.log(getRecipes);
    // expect(getRecipes).toHaveBeenCalled(2);
    expect(getAllByTestId('recipes')).toHaveLength(10);
  });
});
