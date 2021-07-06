import 'react-native';
import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import LoginScreen from '../src/containers/LoginScreen';
import {renderWithAllWrapper} from 'lib/testing/renderHelper';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('../src/lib/context/AuthContext/AuthContextProvider.js');

const navigate = jest.fn();
const signInFn = jest.fn();
window.alert = jest.fn();

describe('Login Screen', () => {
  it('renders screen text correctly', async () => {
    const {getByText, getByPlaceholderText} = renderWithAllWrapper(
      <LoginScreen navigation={{navigate}} />,
      {signIn: signInFn},
    );

    const header = getByText('Welcome back');
    expect(header).toBeTruthy();

    const button = getByText('Sign In');
    expect(button).toBeTruthy();

    const footerLinkText = getByText('Sign Up');
    expect(footerLinkText).toBeTruthy();

    const emailPlaceholderText = getByPlaceholderText('Email');
    expect(emailPlaceholderText).toBeTruthy();

    const passwordPlaceholderText = getByPlaceholderText('Password');
    expect(passwordPlaceholderText).toBeTruthy();

    const footerText = getByText("Don't have an account?");
    expect(footerText).toBeTruthy();
  });

  it('renders Registration screen when link is pressed', () => {
    const {getByText} = renderWithAllWrapper(
      <LoginScreen navigation={{navigate}} />,
      {signIn: signInFn},
    );

    const footerLinkText = getByText('Sign Up');
    expect(footerLinkText).toBeTruthy();

    fireEvent.press(getByText('Sign Up'));

    const signInLinkText = getByText('Sign In');
    expect(signInLinkText).toBeTruthy();

    expect(navigate).toHaveBeenCalledWith('Registration');
  });

  it('calls signIn when button is pressed', () => {
    const {getByText, getByPlaceholderText} = renderWithAllWrapper(
      <LoginScreen navigation={{navigate}} />,
      {signIn: signInFn},
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const signInButton = getByText('Sign In');

    fireEvent.changeText(emailInput, 'test@gmail.com');
    expect(emailInput.props.value).toBe('test@gmail.com');

    fireEvent.changeText(passwordInput, 'password');
    expect(passwordInput.props.value).toBe('password');

    fireEvent.press(signInButton);
    expect(signInFn).toHaveBeenCalledTimes(1);
    expect(signInFn).toHaveBeenCalledWith('test@gmail.com', 'password');
  });
});
