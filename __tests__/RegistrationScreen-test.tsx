import 'react-native';
import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import RegistrationScreen from '../src/containers/RegistrationScreen';
import {renderWithAllWrapper} from '../src/lib/testing/renderHelper';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('../src/lib/context/AuthContext/AuthContextProvider.js');

const navigate = jest.fn();
const registerAccountFn = jest.fn();
window.alert = jest.fn();

describe('Registration Screen', () => {
  it('renders screen text correctly', () => {
    const {getByText, getByPlaceholderText} = renderWithAllWrapper(
      <RegistrationScreen navigation={{navigate}} />,
      {registerAccount: registerAccountFn},
    );

    const header = getByText('Welcome to Recipes');
    expect(header).toBeTruthy();

    const button = getByText('Sign Up');
    expect(button).toBeTruthy();

    const footerLinkText = getByText('Sign In');
    expect(footerLinkText).toBeTruthy();

    const displayNamePlaceholderText = getByPlaceholderText('Display Name');
    expect(displayNamePlaceholderText).toBeTruthy();

    const emailPlaceholderText = getByPlaceholderText('Email');
    expect(emailPlaceholderText).toBeTruthy();

    const passwordPlaceholderText = getByPlaceholderText('Password');
    expect(passwordPlaceholderText).toBeTruthy();

    const confirmPasswordPlaceholderText =
      getByPlaceholderText('Confirm Password');
    expect(confirmPasswordPlaceholderText).toBeTruthy();

    const footerText = getByText('Already have an account?');
    expect(footerText).toBeTruthy();
  });

  it('renders Login screen when link is pressed', () => {
    const {getByText} = renderWithAllWrapper(
      <RegistrationScreen navigation={{navigate}} />,
      {registerAccount: registerAccountFn},
    );

    const footerLinkText = getByText('Sign In');
    expect(footerLinkText).toBeTruthy();

    fireEvent.press(getByText('Sign In'));

    const signInLinkText = getByText('Sign Up');
    expect(signInLinkText).toBeTruthy();

    expect(navigate).toHaveBeenCalledWith('Login');
  });

  it('calls registerAccount when button is pressed', () => {
    const {getByText, getByPlaceholderText} = renderWithAllWrapper(
      <RegistrationScreen navigation={{navigate}} />,
      {registerAccount: registerAccountFn},
    );

    const displayNameInput = getByPlaceholderText('Display Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('Sign Up');

    fireEvent.changeText(displayNameInput, 'tester');
    expect(displayNameInput.props.value).toBe('tester');

    fireEvent.changeText(emailInput, 'test@gmail.com');
    expect(emailInput.props.value).toBe('test@gmail.com');

    fireEvent.changeText(passwordInput, 'password');
    expect(passwordInput.props.value).toBe('password');

    fireEvent.changeText(confirmPasswordInput, 'password');
    expect(confirmPasswordInput.props.value).toBe('password');

    fireEvent.press(registerButton);
    expect(registerAccountFn).toHaveBeenCalledTimes(1);
    expect(registerAccountFn).toHaveBeenCalledWith(
      'tester',
      'test@gmail.com',
      'password',
    );
  });

  it('display error when password and confirm password does not match', async () => {
    const {getByText, getByPlaceholderText} = renderWithAllWrapper(
      <RegistrationScreen navigation={{navigate}} />,
      {registerAccount: registerAccountFn},
    );

    const displayNameInput = getByPlaceholderText('Display Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('Sign Up');

    fireEvent.changeText(displayNameInput, 'tester');
    expect(displayNameInput.props.value).toBe('tester');

    fireEvent.changeText(emailInput, 'test@gmail.com');
    expect(emailInput.props.value).toBe('test@gmail.com');

    fireEvent.changeText(passwordInput, 'p');
    expect(passwordInput.props.value).toBe('p');

    fireEvent.changeText(confirmPasswordInput, 'password');
    expect(confirmPasswordInput.props.value).toBe('password');

    fireEvent.press(registerButton);
    expect(registerAccountFn).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
