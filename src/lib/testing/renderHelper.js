import React from 'React';
import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';
import {AuthContext} from 'lib/context/AuthContext/AuthContextProvider';

export const renderWithAllWrapper = (children, value) => {
  return render(
    <AuthContext.Provider value={value}>
      <NavigationContainer>{children}</NavigationContainer>
    </AuthContext.Provider>,
  );
};

export const renderWithAuthWrapper = (children, value) => {
  return render(
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>,
  );
};

export const renderWithNavWrapper = children => {
  return render(<NavigationContainer>{children}</NavigationContainer>);
};
