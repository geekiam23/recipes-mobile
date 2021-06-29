/**
 * @format
 */

import 'react-native';
import React from 'react';
import LoginScreen from '../src/containers/LoginScreen';
import {render, screen} from '@testing-library/react';

it('renders correctly', () => {
  render(<LoginScreen />);
});
