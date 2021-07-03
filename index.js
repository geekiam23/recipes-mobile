/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import AuthContextProvider from './src/lib/context/AuthContext/AuthContextProvider';

const AppProviders = () => (
  <AuthContextProvider>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </AuthContextProvider>
);

AppRegistry.registerComponent(appName, () => AppProviders);
